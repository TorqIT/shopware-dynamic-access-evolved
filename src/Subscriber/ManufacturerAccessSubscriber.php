<?php declare(strict_types=1);

namespace Torq\Shopware\DynamicAccessEvolved\Subscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntitySearchedEvent;
use Shopware\Core\Content\Product\Aggregate\ProductManufacturer\ProductManufacturerDefinition;
use Shopware\Core\PlatformRequest;
use Torq\Shopware\DynamicAccessEvolved\Service\AccessRuleService;

class ManufacturerAccessSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly AccessRuleService $accessRuleService,
        private readonly RequestStack $requestStack
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            EntitySearchedEvent::class => 'onEntitySearched',
        ];
    }

    public function onEntitySearched(EntitySearchedEvent $event): void
    {
        // Only apply to product_manufacturer entity
        if ($event->getDefinition()->getEntityName() !== ProductManufacturerDefinition::ENTITY_NAME) {
            return;
        }

        $context = $event->getContext();

        // Try to get SalesChannelContext from the current request
        $salesChannelContext = null;
        $currentRequest = $this->requestStack->getCurrentRequest();

        if ($currentRequest && $currentRequest->attributes->has(PlatformRequest::ATTRIBUTE_SALES_CHANNEL_CONTEXT_OBJECT)) {
            $salesChannelContext = $currentRequest->attributes->get(PlatformRequest::ATTRIBUTE_SALES_CHANNEL_CONTEXT_OBJECT);
        }

        // Apply manufacturer access filters (will skip if no SalesChannelContext available)
        $this->accessRuleService->applyManufacturerAccessFilters(
            $event->getCriteria(),
            $context,
            $salesChannelContext
        );
    }
}
