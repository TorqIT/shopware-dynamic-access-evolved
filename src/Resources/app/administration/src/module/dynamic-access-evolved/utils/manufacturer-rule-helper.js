/**
 * Helper utilities for determining if a rule is a simple manufacturer-only rule
 */

/**
 * Check if a filter is a simple manufacturer rule
 * Simple rules: single OR container with single AND condition containing only manufacturer filters
 * This matches the backend logic in AccessRuleService.php
 */
export function isSimpleManufacturerRule(filter) {
    if (!filter || !filter.queries || filter.queries.length === 0) {
        return false;
    }

    // Must be a multi filter
    if (filter.type !== 'multi') {
        return false;
    }

    // Check if it's an OR container
    if (filter.operator && filter.operator.toLowerCase() === 'or') {
        // Must have exactly ONE query (the AND child)
        if (filter.queries.length !== 1) {
            return false;
        }
        const andQuery = filter.queries[0];
        return containsOnlyManufacturerFilters(andQuery);
    }
    // Check if it's an AND container
    else if (filter.operator && filter.operator.toLowerCase() === 'and') {
        return containsOnlyManufacturerFilters(filter);
    }

    return false;
}

/**
 * Check if a query contains only manufacturer filters (no other field types)
 * Recursively validates all nested queries
 */
export function containsOnlyManufacturerFilters(query) {
    if (!query) {
        return false;
    }

    // If this query has a queries array, check all items in it
    if (query.queries && Array.isArray(query.queries)) {
        for (const subQuery of query.queries) {
            if (subQuery.queries && subQuery.queries.length > 0) {
                // Nested structure - check recursively
                if (!containsOnlyManufacturerFilters(subQuery)) {
                    return false;
                }
            } else if (subQuery.field) {
                // Leaf node - check if field is manufacturer-related
                if (subQuery.field !== 'manufacturer.id') {
                    return false;
                }
            }
        }
        return true;
    }

    // If it's a direct filter with a field property
    if (query.field) {
        return query.field === 'manufacturer.id';
    }

    return false;
}
