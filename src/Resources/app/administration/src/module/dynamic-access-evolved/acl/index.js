/**
 * @package buyers-experience
 */
const { Service } = Shopware;

Service('privileges')
    .addPrivilegeMappingEntry({
        category: 'permissions',
        parent: 'torq_dynamic_access_evolved',
        key: 'torq_dynamic_access_evolved',
        roles: {
            viewer: {
                privileges: [
                    'customer:read',
                    'rule:read',
                    'sales_channel:read',
                    'rule_condition:read',
                    'user_config:read',
                    'product_manufacturer:read',
                    'category:read',
                    'product:read',
                    'property_group_option:read',
                    'property_group:read',
                    'torq_dynamic_access_evolved:read',
                    'torq_dynamic_access_evolved_customer_rule:read',
                    'torq_dynamic_access_evolved_sales_channel:read',
                    'user_config:create',
                    'user_config:update',
                    'custom_field_set:read',
                    'custom_field:read',
                    'custom_field_set_relation:read',
                ],
                dependencies: [],
            },
            editor: {
                privileges: [
                    'torq_dynamic_access_evolved:update',
                    'torq_dynamic_access_evolved_customer_rule:create',
                    'torq_dynamic_access_evolved_customer_rule:delete',
                    'torq_dynamic_access_evolved_sales_channel:create',
                    'torq_dynamic_access_evolved_sales_channel:delete',
                    Shopware.Service('privileges').getPrivileges('rule.creator'),
                ],
                dependencies: [
                    'torq_dynamic_access_evolved.viewer',
                ],
            },
            creator: {
                privileges: [
                    'torq_dynamic_access_evolved:create',
                ],
                dependencies: [
                    'torq_dynamic_access_evolved.viewer',
                    'torq_dynamic_access_evolved.editor',
                ],
            },
            deleter: {
                privileges: [
                    'torq_dynamic_access_evolved:delete',
                ],
                dependencies: [
                    'torq_dynamic_access_evolved.viewer',
                ],
            },
        },
    });