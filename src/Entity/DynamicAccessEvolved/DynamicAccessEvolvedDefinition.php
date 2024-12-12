<?php declare(strict_types=1);

namespace Torq\Shopware\DynamicAccessEvolved\Entity\DynamicAccessEvolved;

use Shopware\Core\Content\Rule\RuleDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\DateTimeField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\CascadeDelete;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\SearchRanking;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\JsonField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\System\SalesChannel\SalesChannelDefinition;
use Torq\Shopware\DynamicAccessEvolved\Entity\DynamicAccessEvolved\DynamicAccessEvolvedEntity;
use Torq\Shopware\DynamicAccessEvolved\Entity\DynamicAccessEvolvedCustomerRule\DynamicAccessEvolvedCustomerRuleDefinition;
use Torq\Shopware\DynamicAccessEvolved\Entity\DynamicAccessEvolvedSalesChannel\DynamicAccessEvolvedSalesChannelDefinition;

class DynamicAccessEvolvedDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'torq_dynamic_access_evolved';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return DynamicAccessEvolvedEntity::class;
    }

    public function getCollectionClass(): string
    {
        return DynamicAccessEvolvedCollection::class;
    }

     /**
     * Gets the default values for new entity instances.
     */
    public function getDefaults(): array
    {
        return [
            'active' => false,
        ];
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new PrimaryKey(), new Required()),
            (new StringField('name', 'name'))->addFlags(new SearchRanking(SearchRanking::HIGH_SEARCH_RANKING)),
            new JsonField('filter', 'filter'),
            new DateTimeField('valid_from', 'validFrom'),
            new DateTimeField('valid_until', 'validUntil'),
            (new BoolField('can_only_access', 'canOnlyAccess'))->addFlags(new Required()),
            (new BoolField('active', 'active'))->addFlags(new Required()),
            (new ManyToManyAssociationField('daeSalesChannels', SalesChannelDefinition::class, DynamicAccessEvolvedSalesChannelDefinition::class, 'torq_dynamic_access_evolved_id', 'sales_channel_id'))->addFlags(new CascadeDelete()),
            (new ManyToManyAssociationField('daeCustomerRules', RuleDefinition::class, DynamicAccessEvolvedCustomerRuleDefinition::class, 'torq_dynamic_access_evolved_id','rule_id'))->addFlags(new CascadeDelete()),
        ]);
    }
}
