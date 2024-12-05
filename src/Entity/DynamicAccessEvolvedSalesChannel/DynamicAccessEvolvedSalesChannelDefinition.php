<?php declare(strict_types=1);

namespace Torq\DynamicAccessEvolved\Entity\DynamicAccessEvolvedSalesChannel;

use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\MappingEntityDefinition;
use Shopware\Core\System\SalesChannel\SalesChannelDefinition;
use Torq\DynamicAccessEvolved\Entity\DynamicAccessEvolved\DynamicAccessEvolvedDefinition;

/** @package Torq\DynamicAccessEvolved\Entity\DynamicAccessEvolvedSalesChannel */
class DynamicAccessEvolvedSalesChannelDefinition extends MappingEntityDefinition
{
    final public const ENTITY_NAME = 'torq_dynamic_access_evolved_sales_channel';

    /**
     * This class is used as m:n relation between dynamic access evolved rules and customer rules.
     * It gives the option to assign what rules may be used for order conditions.
     */
    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function since(): ?string
    {
        return '6.0.0.0';
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new FkField('torq_dynamic_access_evolved_id', 'torqDynamicAccessEvolvedId', DynamicAccessEvolvedDefinition::class))->addFlags(new PrimaryKey(), new Required()),
            (new FkField('sales_channel_id', 'salesChannelId', SalesChannelDefinition::class))->addFlags(new PrimaryKey(), new Required()),
            new ManyToOneAssociationField('torqDynamicAccessEvolved', 'torq_dynamic_access_evolved_id', DynamicAccessEvolvedDefinition::class, 'id'),
            new ManyToOneAssociationField('salesChannel', 'sales_channel_id', SalesChannelDefinition::class, 'id', false),
        ]);
    }
}
