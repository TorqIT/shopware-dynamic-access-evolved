// <plugin root>/src/Resources/app/administration/src/module/dynamic-access-evolved/index.js

Shopware.Component.register('torq-dynamic-access-evolved-list', () => import('./page/torq-dynamic-access-evolved-list'));
Shopware.Component.register('torq-dynamic-access-evolved-detail', () => import('./page/torq-dynamic-access-evolved-detail'));
Shopware.Component.register('torq-dynamic-access-evolved-empty-state-hero', () => import('./component/torq-dynamic-access-evolved-empty-state-hero'));
Shopware.Component.register('torq-dynamic-access-evolved-or-container', () => import('./component/torq-dynamic-access-evolved-or-container'));
Shopware.Component.register('torq-dynamic-access-evolved-and-container', () => import('./component/torq-dynamic-access-evolved-and-container'));
Shopware.Component.register('torq-dynamic-access-evolved-filter', () => import('./component/torq-dynamic-access-evolved-filter'));
Shopware.Component.register('torq-dynamic-access-evolved-product-filter', () => import('./component/torq-dynamic-access-evolved-product-filter'));
Shopware.Component.register('torq-dynamic-access-evolved-category-filter', () => import('./component/torq-dynamic-access-evolved-category-filter'));
Shopware.Component.register('torq-dynamic-access-evolved-manufacturer-filter', () => import('./component/torq-dynamic-access-evolved-manufacturer-filter'));
Shopware.Component.register('torq-dynamic-access-evolved-sales-channel-select', () => import('./component/torq-dynamic-access-evolved-sales-channel-select'));
Shopware.Component.register('torq-dynamic-access-evolved-rule-select', () => import('./component/torq-dynamic-access-evolved-rule-select'));

import './acl';
import defaultSearchConfiguration from './default-search-configuration';

import deDE from './snippet/de-DE';
import enGB from './snippet/en-GB';

Shopware.Module.register('torq-dynamic-access-evolved', {
    type: 'plugin',
    name: 'Dynamic Access Evolved',
    title: 'dynamic-access-evolved.general.mainMenuItemGeneral',
    description: 'sw-property.general.descriptionTextModule',
    color: '#ff3d58',
    icon: 'regular-products',
    favicon: 'icon-module-products.png',
    entity: 'torq_dynamic_access_evolved',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

    routes: {
        list: {
            component: 'torq-dynamic-access-evolved-list',
            path: 'list',
            meta: {
                privilege: 'torq_dynamic_access_evolved.viewer',
                appSystem: {
                    view: 'list',
                },
            },
        },
        detail: {
            component: 'torq-dynamic-access-evolved-detail',
            path: 'detail/:id?',
            meta: {
                privilege: 'torq_dynamic_access_evolved.viewer',
                appSystem: {
                    view: 'detail',
                },
                parentPath: 'torq.dynamic.access.evolved.list'
            },
            props: {
                default: (route) => {
                    return {
                        daeId: route.params.id,
                    };
                },
            },
        },
        create: {
            component: 'torq-dynamic-access-evolved-detail',
            path: 'create',    
            meta: {
                privilege: 'torq_dynamic_access_evolved.creator',
            },
        }
    },

    navigation: [{
        label: 'torq-dynamic-access-evolved.general.mainMenuItemGeneral',
        color: '#ff3d58',
        parent: 'sw-catalogue',
        path: 'torq.dynamic.access.evolved.list',
        icon: 'regular-products',
        position: 100
    }],
    defaultSearchConfiguration
});
