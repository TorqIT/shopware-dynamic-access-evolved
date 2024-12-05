<?php declare(strict_types=1);
/*
 * (c) shopware AG <info@shopware.com>
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Torq\DynamicAccessEvolved\Entity\Extension;

use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\CascadeDelete;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\System\SalesChannel\SalesChannelDefinition;
use Torq\DynamicAccessEvolved\Entity\DynamicAccessEvolved\DynamicAccessEvolvedDefinition;
use Torq\DynamicAccessEvolved\Entity\DynamicAccessEvolvedSalesChannel\DynamicAccessEvolvedSalesChannelDefinition;

class SalesChannelExtension extends EntityExtension
{
    public function getDefinitionClass(): string
    {
        return SalesChannelDefinition::class;
    }

    public function extendFields(FieldCollection $collection): void
    {
        $collection->add(
            (new ManyToManyAssociationField(
                'daeSalesChannels',
                DynamicAccessEvolvedDefinition::class,
                DynamicAccessEvolvedSalesChannelDefinition::class,
                'sales_channel_id',
                'torq_dynamic_access_evolved_id'
            ))->addFlags(new CascadeDelete())
        );
    }
}