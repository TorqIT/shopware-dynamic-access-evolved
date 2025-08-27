<?php declare(strict_types=1);

namespace Torq\Shopware\DynamicAccessEvolved\Core\Content\Product\SalesChannel\Listing;

use Shopware\Core\Content\Product\SalesChannel\Listing\AbstractProductListingRoute;
use Shopware\Core\Content\Product\SalesChannel\Listing\ProductListingRouteResponse;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Symfony\Component\HttpFoundation\Request;

class DynamicAccessProductListingRoute extends AbstractProductListingRoute
{
    public function __construct(
        private readonly AbstractProductListingRoute $decorated
    ) {
    }

    public function getDecorated(): AbstractProductListingRoute
    {
        return $this->decorated;
    }

    public function load(string $categoryId, Request $request, SalesChannelContext $context, ?Criteria $criteria = null): ProductListingRouteResponse
    {
        // Get the response from the decorated route
        $response = $this->decorated->load($categoryId, $request, $context, $criteria);
        
        // Check if we need to recalculate pagination due to access rules filtering
        $result = $response->getResult();
        $currentPageElements = count($result->getElements());
        $expectedPageSize = $result->getCriteria()->getLimit() ?? 24; // Default page size
        
        // If we have fewer elements than expected and we're not on the last page,
        // it might indicate that access rules filtered out some products
        $totalPages = (int) ceil($result->getTotal() / $expectedPageSize);
        if ($currentPageElements < $expectedPageSize && $result->getPage() < $totalPages) {
            // For now, we'll let the existing logic handle this
            // The main fix is in the subscriber using earlier events
        }
        
        return $response;
    }
}
