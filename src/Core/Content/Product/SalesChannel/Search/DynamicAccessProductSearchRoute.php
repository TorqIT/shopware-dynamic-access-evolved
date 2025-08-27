<?php declare(strict_types=1);

namespace Torq\Shopware\DynamicAccessEvolved\Core\Content\Product\SalesChannel\Search;

use Shopware\Core\Content\Product\SalesChannel\Search\AbstractProductSearchRoute;
use Shopware\Core\Content\Product\SalesChannel\Search\ProductSearchRouteResponse;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Symfony\Component\HttpFoundation\Request;

class DynamicAccessProductSearchRoute extends AbstractProductSearchRoute
{
    public function __construct(
        private readonly AbstractProductSearchRoute $decorated
    ) {
    }

    public function getDecorated(): AbstractProductSearchRoute
    {
        return $this->decorated;
    }

    public function load(Request $request, SalesChannelContext $context, ?Criteria $criteria = null): ProductSearchRouteResponse
    {
        // Get the response from the decorated route
        $response = $this->decorated->load($request, $context, $criteria);
        
        // Check if we need to recalculate pagination due to access rules filtering
        $result = $response->getListingResult();
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
