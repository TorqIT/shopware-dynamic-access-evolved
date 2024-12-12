<?php declare(strict_types=1);
/*
 * (c) shopware AG <info@shopware.com>
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Torq\Shopware\DynamicAccessEvolved\Core\Content\Product\SalesChannel;

use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\Filter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\MultiFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\NotFilter;

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
            parent::__construct(MultiFilter::CONNECTION_AND, [
                new NotFilter(MultiFilter::CONNECTION_AND, [
                    $rule
                ])
            ]);
        }
    }
}