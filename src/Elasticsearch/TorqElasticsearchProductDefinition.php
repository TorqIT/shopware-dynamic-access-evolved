<?php declare(strict_types=1);

namespace Torq\Shopware\DynamicAccessEvolved\Elasticsearch;

use OpenSearchDSL\BuilderInterface;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Elasticsearch\Framework\AbstractElasticsearchDefinition;

/**
 * Decorates the ElasticsearchProductDefinition to add streamIds field to the index mapping.
 *
 * This ensures that product stream filtering can use Elasticsearch instead of falling back to DBAL,
 * maintaining consistent performance for large catalogs.
 *
 * Note: Uses AbstractElasticsearchDefinition as type hint to support decorator chains
 * (e.g., if CascadePlugin also decorates ElasticsearchProductDefinition).
 */
class TorqElasticsearchProductDefinition extends AbstractElasticsearchDefinition
{
    public function __construct(
        private readonly AbstractElasticsearchDefinition $decorated
    ) {
    }

    /**
     * Extend the ES mapping to include streamIds field
     */
    public function getMapping(Context $context): array
    {
        $mapping = $this->decorated->getMapping($context);

        // Add streamIds to the properties mapping
        // Using KEYWORD_FIELD type (same as categoryIds, tagIds, propertyIds, optionIds)
        $mapping['properties']['streamIds'] = self::KEYWORD_FIELD;

        return $mapping;
    }

    /**
     * Delegate to decorated instance
     */
    public function getEntityDefinition(): EntityDefinition
    {
        return $this->decorated->getEntityDefinition();
    }

    /**
     * Delegate to decorated instance
     */
    public function buildTermQuery(Context $context, Criteria $criteria): BuilderInterface
    {
        return $this->decorated->buildTermQuery($context, $criteria);
    }

    /**
     * Delegate to decorated instance
     *
     * Note: The streamIds field is already included in the base fetch because it exists
     * on the ProductEntity and is populated by ProductStreamUpdater. We just need to
     * ensure the mapping exists (via getMapping()) so it gets indexed.
     */
    public function fetch(array $ids, Context $context): array
    {
        return $this->decorated->fetch($ids, $context);
    }
}
