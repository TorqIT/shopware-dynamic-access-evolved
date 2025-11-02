# Overview

This is a Shopware Plugin that allows admins to define rules in the administrative interface to control which products a storefront user has access to.

## Dependencies

This plugin depends on both Shopware and Shopware Commercial packages located respectively at `~/src/vendor/shopware` and `~/src/vendor/store.shopware.com`.

## Important Files/folders:
- `~/src/Resources/app/administration` - This is the root of all Vue components to create the admin interface
- `~/src/Subscriber/DynamicAccessEvolvedSubscriber.php` - This hooks into the product loading event to apply additional criteria to restrict products that rules are defined for in the backend.
- `~/src/Elasticsearch/DynamicAccessEvolvedElasticsearchProductDefinitionDecorator.php` - This file adds the streamIds to the ElasticSearch index to enable Product Stream filtering (Shopware's Dynamic Product Groups)
- `~/src/Entity` - Contains the Entities that represent the data structures for the rules created by this plugin. These ultimately get stored in the tables defined via the migrations in `~/src/Migration`.


## Filter Types

### Rule Definitions
Rules can be defined to effect the following before setting up a criteria:

- Valid From - Start Date for the rule to apply, or unlimited start if not defined
- Valid Until - End Date for the rule to apply, or unlimited end if not defined
- Active - Toggles rule on or off
- Sales Channels - Restrict this rule to a specific Sales Channel
- Customer Rules - Uses Shopware's Rule Builder to target a specific customer or rule condition to apply the filters from this plugin.
- Can Only Access - Toggle that determines access mode:
  - **ON (Whitelist)**: Matched customers can ONLY access the filtered products
  - **OFF (Blacklist)**: Matched customers CANNOT access the filtered products

### Product Rules

Rules are created that suport the following product filters. These can be groups together into logical AND and OR groups to create advanced filters when restricting products.

- Product - Hand curate a list of products
- Manufacturer - Hand curate a list of manufacturers (Note: Blacklist mode includes products without a manufacturer)
- Category - Hand curate a list of categories
- Product Stream - Allows leveraging Shopware's native "Dynamic Product Groups". Products created in a Product Group can be restricted.

## How It Works

1. Admins create rules in the backend defining which customers (via Shopware Rules) should have restricted product access
2. When a customer browses the storefront, the `DynamicAccessEvolvedSubscriber` intercepts product queries
3. The subscriber evaluates active rules matching the customer's context (sales channel, rule conditions, date range)
4. Matching rules are converted to Shopware criteria filters and applied to the product query
5. Only products passing all active filters are returned to the customer

