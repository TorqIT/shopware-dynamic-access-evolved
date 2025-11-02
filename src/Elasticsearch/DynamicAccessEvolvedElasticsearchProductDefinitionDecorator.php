<?php declare(strict_types=1);

namespace Torq\Shopware\DynamicAccessEvolved\Elasticsearch;

use Doctrine\DBAL\ArrayParameterType;
use OpenSearchDSL\BuilderInterface;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Elasticsearch\Framework\AbstractElasticsearchDefinition;
use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\DataAbstractionLayer\Doctrine\FetchModeHelper;
use Shopware\Elasticsearch\Framework\ElasticsearchIndexingUtils;


class DynamicAccessEvolvedElasticsearchProductDefinitionDecorator extends AbstractElasticsearchDefinition
{
    public function __construct(
        private readonly AbstractElasticsearchDefinition $decorated,
        private readonly Connection $connection
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

    public function fetch(array $ids, Context $context): array
    {
        $documents = $this->decorated->fetch($ids, $context);

        $uuids = \array_map(fn ($id): string => Uuid::fromBytesToHex($id), $ids);
      
        $streams = $this->fetchStreams($uuids);

        foreach ($documents as &$document) {
            $documentId = $document['id'];

            if (isset($streams[$documentId])) {
                $streamIds = ElasticsearchIndexingUtils::parseJson($streams[$documentId], 'stream_ids');
                $document['streamIds'] = $streamIds;
            }
        }

        return $documents;
    }

    private function fetchStreams(array $productIds = []): array
    {
        $sql = 'SELECT LOWER(HEX(id)) as id, stream_ids FROM product WHERE id in (?)';

        $data = $this->connection->fetchAllAssociative($sql, [Uuid::fromHexToBytesList($productIds)], [ArrayParameterType::STRING]);

        return FetchModeHelper::groupUnique($data);
    }
}
