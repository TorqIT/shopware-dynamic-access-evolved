<?php declare(strict_types=1);
/*
 * (c) shopware AG <info@shopware.com>
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Torq\DynamicAccessEvolved\Entity\Extension;

use Shopware\Core\Content\Rule\RuleDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\CascadeDelete;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\RuleAreas;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Torq\DynamicAccessEvolved\Entity\DynamicAccessEvolved\DynamicAccessEvolvedDefinition;
use Torq\DynamicAccessEvolved\Entity\DynamicAccessEvolvedCustomerRule\DynamicAccessEvolvedCustomerRuleDefinition;

class RuleExtension extends EntityExtension
{
    public function getDefinitionClass(): string
    {
        return RuleDefinition::class;
    }

    public function extendFields(FieldCollection $collection): void
    {
        $collection->add(
            (new ManyToManyAssociationField(
                'daeCustomerRules',
                DynamicAccessEvolvedDefinition::class,
                DynamicAccessEvolvedCustomerRuleDefinition::class,
                'rule_id',
                'torq_dynamic_access_evolved_id'
            ))->addFlags(new CascadeDelete(), new RuleAreas("dae_product_access"))
        );
    }
}