<?php declare(strict_types=1);

namespace Torq\Shopware\DynamicAccessEvolved\Subscriber;

use Shopware\Commercial\AdvancedSearch\Entity\SearchAction\Aggregate\ActionSearchTermDefinition;
use Shopware\Commercial\AdvancedSearch\Event\MultiContentSuggestCriteriaEvent;
use Shopware\Core\Content\Product\Events\ProductSuggestCriteriaEvent;
use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Content\Product\ProductEvents;
use Shopware\Core\Content\Product\SalesChannel\SalesChannelProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Dbal\Common\RepositoryIterator;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntitySearchedEvent;
use Shopware\Core\Framework\DataAbstractionLayer\Exception\SearchRequestException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\AndFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsAnyFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\OrFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\RangeFilter;
use Shopware\Core\System\SalesChannel\Event\SalesChannelProcessCriteriaEvent;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Parser\QueryStringParser;
use Torq\Shopware\DynamicAccessEvolved\Core\Content\Product\SalesChannel\AccessRuleFilter;

class DynamicAccessEvolvedSubscriber implements EventSubscriberInterface
{
    private ?array $productAccessRules = null;
    private static ?SalesChannelContext $context = null;

    public function __construct(private EntityRepository $dynamicAccessEvolvedRepository, private ProductDefinition $productDefinition, private SalesChannelProductDefinition $salesChannelProductDefinition)
    {

    }
    
    public static function getSubscribedEvents(): array
    {
        return [
            'sales_channel.product.process.criteria' => 'onProductProcessCriteria',
        ];
    }

    public function onProductProcessCriteria(SalesChannelProcessCriteriaEvent $event): void
    {
        if(self::$context == null) {
            self::$context = $event->getSalesChannelContext();
        }

        $criteria = $event->getCriteria();

        if (!$this->hasFilter($criteria, AccessRuleFilter::class)) {
            $this->getMatchingProductAccessRules($event->getSalesChannelContext());

            foreach($this->productAccessRules as $rule) {

                $filter = QueryStringParser::fromArray($this->productDefinition, $rule->getFilter(), new SearchRequestException());

                $criteria->addFilter(new AccessRuleFilter(
                    $rule->isCanOnlyAccess(),
                    $filter
                ));
            }
        }
    }

    /**
     * @param class-string<Filter> $filterClassName
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

    private function getMatchingProductAccessRules(SalesChannelContext $context): array
    {
        if($this->productAccessRules != null) {
            return $this->productAccessRules;
        }

        $today = new \DateTime();
        $today = $today->setTimezone(new \DateTimeZone('UTC'));
        $todayFormat = $today->format('Y-m-d H:i:s');

        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('active', true));

        
        $criteria->addFilter(new AndFilter(
            [
                new OrFilter(
                [
                    new RangeFilter('validFrom', [
                        RangeFilter::LTE => $todayFormat,
                    ]),
                    new EqualsFilter('validFrom', null)
                ]),
                new OrFilter(
                [
                    new RangeFilter('validUntil', [
                        RangeFilter::GTE => $todayFormat,
                    ]),
                    new EqualsFilter('validUntil', null)
                ]),
            ]
        ));

        $criteria->addAssociations(['daeCustomerRules', 'daeSalesChannels']);

        $matchingRulesIds = $context->getRuleIdsByAreas(['dae_product_access']);

        $criteria->addFilter(new EqualsAnyFilter('daeCustomerRules.id', $matchingRulesIds));
        $criteria->addFilter(new EqualsAnyFilter('daeSalesChannels.id', [$context->getSalesChannelId()]));

        $criteria->setLimit(25);

        $iterator = new RepositoryIterator(
            $this->dynamicAccessEvolvedRepository,
            $context->getContext(),
            $criteria
        );

        $rules = [];

        while($match = $iterator->fetch()) {
            $rules = array_merge($rules, $match->getElements());
        }

        $this->productAccessRules = $rules;

        return $this->productAccessRules;
    }
}
