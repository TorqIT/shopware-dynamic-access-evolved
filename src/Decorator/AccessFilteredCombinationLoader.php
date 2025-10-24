<?php declare(strict_types=1);

namespace Torq\Shopware\DynamicAccessEvolved\Decorator;

use Doctrine\DBAL\Connection;
use Shopware\Core\Content\Product\SalesChannel\Detail\AbstractAvailableCombinationLoader;
use Shopware\Core\Content\Product\SalesChannel\Detail\AvailableCombinationResult;
use Shopware\Core\Framework\Util\Hasher;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Torq\Shopware\DynamicAccessEvolved\Service\AccessRuleService;

class AccessFilteredCombinationLoader extends AbstractAvailableCombinationLoader
{
    public function __construct(
        private readonly AbstractAvailableCombinationLoader $decorated,
        private readonly Connection $connection,
        private readonly AccessRuleService $accessRuleService
    ) {
    }

    public function getDecorated(): AbstractAvailableCombinationLoader
    {
        return $this->decorated;
    }

    public function loadCombinations(string $productId, SalesChannelContext $salesChannelContext): AvailableCombinationResult
    {
        // 1. Let the decorated service (and entire decorator chain) do its work
        //    This handles all stock logic, other decorators, and Shopware's core logic
        $fullResult = $this->decorated->loadCombinations($productId, $salesChannelContext);

        // 2. Get accessible variant IDs based on access rules
        $accessibleVariantIds = $this->accessRuleService->getAccessibleVariantIds($productId, $salesChannelContext);

        // 3. If no variants are accessible, return empty result
        if (empty($accessibleVariantIds)) {
            return new AvailableCombinationResult();
        }

        // 4. Get option combinations for accessible variants
        $accessibleCombinations = $this->getAccessibleOptionCombinations(
            $productId,
            $accessibleVariantIds,
            $salesChannelContext
        );

        // 5. Filter the full result to only include accessible combinations
        return $this->filterResult($fullResult, $accessibleCombinations);
    }

    /**
     * Get the option ID combinations for accessible variants
     * Returns a set of option ID arrays (sorted) for fast lookup
     *
     * @param array<string> $accessibleVariantIds
     * @return array<string, array<string>> Hash => sorted option IDs
     */
    private function getAccessibleOptionCombinations(
        string $productId,
        array $accessibleVariantIds,
        SalesChannelContext $salesChannelContext
    ): array {
        $query = $this->connection->createQueryBuilder();
        $query->from('product');

        $query->andWhere('product.parent_id = :id');
        $query->andWhere('product.version_id = :versionId');
        $query->andWhere('LOWER(HEX(product.id)) IN (:accessibleIds)');
        $query->andWhere('product.option_ids IS NOT NULL');

        $query->setParameter('id', Uuid::fromHexToBytes($productId));
        $query->setParameter('versionId', Uuid::fromHexToBytes($salesChannelContext->getContext()->getVersionId()));
        $query->setParameter('accessibleIds', $accessibleVariantIds, \Doctrine\DBAL\ArrayParameterType::STRING);

        $query->select('product.option_ids as options');

        $results = $query->executeQuery()->fetchAllAssociative();

        $combinations = [];
        foreach ($results as $row) {
            try {
                $optionIds = json_decode((string) $row['options'], true, 512, \JSON_THROW_ON_ERROR);
                if (is_array($optionIds)) {
                    // Sort for consistent hashing
                    sort($optionIds);
                    $hash = $this->hashOptions($optionIds);
                    $combinations[$hash] = $optionIds;
                }
            } catch (\JsonException) {
                continue;
            }
        }

        return $combinations;
    }

    /**
     * Filter the full result to only include combinations that are accessible
     */
    private function filterResult(
        AvailableCombinationResult $fullResult,
        array $accessibleCombinations
    ): AvailableCombinationResult {
        $filteredResult = new AvailableCombinationResult();

        foreach ($fullResult->getCombinations() as $optionIds) {
            // Check if this combination is in our accessible set
            $sortedOptions = $optionIds;
            sort($sortedOptions);
            $combinationHash = $this->hashOptions($sortedOptions);

            if (isset($accessibleCombinations[$combinationHash])) {
                // This combination is accessible - add it to filtered result
                $available = $fullResult->isAvailable($optionIds);
                $filteredResult->addCombination($optionIds, $available);
            }
        }

        return $filteredResult;
    }

    /**
     * Create a consistent hash for a sorted array of option IDs
     * Uses Shopware's built-in Hasher utility for consistency with AvailableCombinationResult
     *
     * @param array<string> $optionIds Sorted array of option IDs
     */
    private function hashOptions(array $optionIds): string
    {
        // Use Shopware's hasher (same as AvailableCombinationResult::calculateHash)
        return Hasher::hash($optionIds);
    }
}
