<?php declare(strict_types=1);

namespace Torq\Shopware\DynamicAccessEvolved\Service;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Content\Product\SalesChannel\SalesChannelProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Dbal\Common\RepositoryIterator;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Exception\SearchRequestException;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\AndFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsAnyFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\OrFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\RangeFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Parser\QueryStringParser;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Torq\Shopware\DynamicAccessEvolved\Core\Content\Product\SalesChannel\AccessRuleFilter;

class AccessRuleService
{
    private ?array $cachedRules = null;
    private ?string $cachedContextHash = null;

    public function __construct(
        private readonly EntityRepository $dynamicAccessEvolvedRepository,
        private readonly ProductDefinition $productDefinition,
        private readonly SalesChannelProductDefinition $salesChannelProductDefinition,
        private readonly EntityRepository $productRepository
    ) {
    }

    /**
     * Get all active access rules matching the current customer context, sales channel, and date range
     */
    public function getMatchingAccessRules(SalesChannelContext $context): array
    {
        $contextHash = $this->getContextHash($context);

        // Return cached rules if context hasn't changed
        if ($this->cachedRules !== null && $this->cachedContextHash === $contextHash) {
            return $this->cachedRules;
        }

        $today = new \DateTime();
        $today = $today->setTimezone(new \DateTimeZone('UTC'));
        $todayFormat = $today->format('Y-m-d H:i:s');

        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('active', true));

        // Filter by date range
        $criteria->addFilter(new AndFilter(
            [
                new OrFilter([
                    new RangeFilter('validFrom', [
                        RangeFilter::LTE => $todayFormat,
                    ]),
                    new EqualsFilter('validFrom', null)
                ]),
                new OrFilter([
                    new RangeFilter('validUntil', [
                        RangeFilter::GTE => $todayFormat,
                    ]),
                    new EqualsFilter('validUntil', null)
                ]),
            ]
        ));

        $criteria->addAssociations(['daeCustomerRules', 'daeSalesChannels']);

        // Filter by matching customer rules
        $matchingRulesIds = $context->getRuleIdsByAreas(['dae_product_access']);
        $criteria->addFilter(new EqualsAnyFilter('daeCustomerRules.id', $matchingRulesIds));

        // Filter by sales channel
        $criteria->addFilter(new EqualsAnyFilter('daeSalesChannels.id', [$context->getSalesChannelId()]));

        $criteria->setLimit(50);

        $iterator = new RepositoryIterator(
            $this->dynamicAccessEvolvedRepository,
            $context->getContext(),
            $criteria
        );

        $rules = [];
        while($match = $iterator->fetch()) {
            $rules = array_merge($rules, $match->getElements());
        }

        // Cache the rules
        $this->cachedRules = $rules;
        $this->cachedContextHash = $contextHash;

        return $this->cachedRules;
    }

    /**
     * Apply all matching access filters to a criteria object
     */
    public function applyAccessFilters(Criteria $criteria, SalesChannelContext $context): void
    {
        // Check if filters already applied
        if ($this->hasFilter($criteria, AccessRuleFilter::class)) {
            return;
        }

        $rules = $this->getMatchingAccessRules($context);

        foreach($rules as $rule) {
            $filter = QueryStringParser::fromArray(
                $this->productDefinition,
                $rule->getFilter(),
                new SearchRequestException()
            );

            $criteria->addFilter(new AccessRuleFilter(
                $rule->isCanOnlyAccess(),
                $filter
            ));
        }
    }

    /**
     * Get IDs of accessible variants under a specific parent product
     * IMPORTANT: This method is designed ONLY for small, scoped datasets (variants under a single parent)
     * Do NOT use for broad product searches - performance will degrade
     *
     * @return array<string> Array of variant product IDs that are accessible
     */
    public function getAccessibleVariantIds(string $parentProductId, SalesChannelContext $context): array
    {
        $rules = $this->getMatchingAccessRules($context);

        // If no rules are active, all variants are accessible
        if (empty($rules)) {
            return $this->getAllVariantIds($parentProductId, $context);
        }

        // Build criteria to find accessible variants
        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('parentId', $parentProductId));
        $criteria->setLimit(500); // Safeguard against accidentally loading too many

        // Apply access rule filters
        foreach($rules as $rule) {
            $filter = QueryStringParser::fromArray(
                $this->productDefinition,
                $rule->getFilter(),
                new SearchRequestException()
            );

            $criteria->addFilter(new AccessRuleFilter(
                $rule->isCanOnlyAccess(),
                $filter
            ));
        }

        $result = $this->productRepository->searchIds($criteria, $context->getContext());

        return $result->getIds();
    }

    /**
     * Get all variant IDs under a parent product (no filtering)
     * Used as fallback when no access rules are active
     *
     * @return array<string>
     */
    private function getAllVariantIds(string $parentProductId, SalesChannelContext $context): array
    {
        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('parentId', $parentProductId));
        $criteria->setLimit(500); // Safeguard

        $result = $this->productRepository->searchIds($criteria, $context->getContext());

        return $result->getIds();
    }

    /**
     * Check if criteria already has a specific filter type
     *
     * @param class-string $filterClassName
     */
    private function hasFilter(Criteria $criteria, string $filterClassName): bool
    {
        foreach ($criteria->getFilters() as $filter) {
            if ($filter instanceof $filterClassName) {
                return true;
            }
        }

        return false;
    }

    /**
     * Generate a hash of the context to detect when it changes
     */
    private function getContextHash(SalesChannelContext $context): string
    {
        return md5(
            $context->getSalesChannelId() .
            implode(',', $context->getRuleIdsByAreas(['dae_product_access'])) .
            ($context->getCustomer()?->getId() ?? 'guest')
        );
    }
}
