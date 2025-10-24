<?php declare(strict_types=1);

namespace Torq\Shopware\DynamicAccessEvolved\Subscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Shopware\Core\System\SalesChannel\Event\SalesChannelProcessCriteriaEvent;
use Torq\Shopware\DynamicAccessEvolved\Service\AccessRuleService;

class DynamicAccessEvolvedSubscriber implements EventSubscriberInterface
{
    public function __construct(private readonly AccessRuleService $accessRuleService)
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
        $this->accessRuleService->applyAccessFilters(
            $event->getCriteria(),
            $event->getSalesChannelContext()
        );
    }
}
