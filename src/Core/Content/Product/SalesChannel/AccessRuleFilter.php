<?php declare(strict_types=1);
/*
 * (c) shopware AG <info@shopware.com>
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Torq\Shopware\DynamicAccessEvolved\Core\Content\Product\SalesChannel;

use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsAnyFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\Filter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\MultiFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\NotFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\OrFilter;

class AccessRuleFilter extends MultiFilter
{
    /**
     * @param string[] $ruleIds
     */
    public function __construct(bool $canOnlyAccess, Filter $rule)
    {
        if($canOnlyAccess)
        {
            parent::__construct(MultiFilter::CONNECTION_AND, [
                $rule
            ]);
        }
        else
        {
            // For "cannot access" rules, check if this involves manufacturer filtering
            if ($this->containsManufacturerFilter($rule)) {
                // For manufacturer "cannot access" rules, we need to ensure that:
                // 1. Products without manufacturers are allowed (manufacturer.id IS NULL)
                // 2. Products with manufacturers that aren't in the blocked list are allowed
                
                parent::__construct(MultiFilter::CONNECTION_AND, [
                    new OrFilter([
                        // Allow products without manufacturer
                        new EqualsFilter('manufacturer.id', null),
                        // Allow products with manufacturer but not in the blocked list
                        new NotFilter(MultiFilter::CONNECTION_AND, [
                            new MultiFilter(MultiFilter::CONNECTION_AND, [
                                // Ensure manufacturer.id is not null before applying the original rule
                                new NotFilter(MultiFilter::CONNECTION_AND, [
                                    new EqualsFilter('manufacturer.id', null)
                                ]),
                                $rule
                            ])
                        ])
                    ])
                ]);
            } else {
                // For non-manufacturer rules, use the standard NOT filter
                parent::__construct(MultiFilter::CONNECTION_AND, [
                    new NotFilter(MultiFilter::CONNECTION_AND, [$rule])
                ]);
            }
        }
    }
    
    /**
     * Recursively check if the filter structure contains manufacturer.id filtering
     */
    private function containsManufacturerFilter(Filter $filter): bool
    {
        // Check direct manufacturer filters
        if ($filter instanceof EqualsFilter && ($filter->getField() === 'manufacturer.id' || $filter->getField() === 'product.manufacturer.id')) {
            return true;
        }
        
        if ($filter instanceof EqualsAnyFilter && ($filter->getField() === 'manufacturer.id' || $filter->getField() === 'product.manufacturer.id')) {
            return true;
        }
        
        // Check nested MultiFilters
        if ($filter instanceof MultiFilter) {
            foreach ($filter->getQueries() as $childFilter) {
                if ($this->containsManufacturerFilter($childFilter)) {
                    return true;
                }
            }
        }
        
        return false;
    }
}