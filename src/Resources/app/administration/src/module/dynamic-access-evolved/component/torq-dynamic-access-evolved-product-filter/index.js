import template from './torq-dynamic-access-evolved-product-filter.html.twig';
import './torq-dynamic-access-evolved-product-filter.scss';

const { Component } = Shopware;
const { mapPropertyErrors } = Component.getComponentHelper();
const { EntityCollection, Criteria } = Shopware.Data;
/**
 * @private
 * @package services-settings
 */
export default {
    template,

    compatConfig: Shopware.compatConfig,

    emits: ['on-selection'],

    inject: ['repositoryFactory', 'acl'],

    props: {
        filter: {
            type: Criteria.Filters,
            required: true
        }
    },

    data() {
        return {
            products: null,
            productIds: this.filter.value == "" ? [] : this.filter.value.split('|')
        }
    },

    computed: {        
        productCriteria() {
            const criteria = new Criteria(1, 25);
            criteria.addAssociation('options.group');

            return criteria;
        },
        productContext() {
            return { ...Shopware.Context.api, inheritance: true };
        },
        productRepository() {
            return this.repositoryFactory.create('product');
        },
    },

    watch: {
        
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.products = new EntityCollection(
                this.productRepository.route,
                this.productRepository.entityName,
                this.productContext,
            );


            if (this.productIds.length <= 0) {
                return Promise.resolve();
            }

            const criteria = new Criteria(1, 25);
            criteria.addAssociation('options.group');
            criteria.setIds(this.productIds);

            return this.productRepository.search(criteria, this.productContext).then((products) => {
                this.products = products;
            });
        },
        setIds(productCollection) {
            this.productIds = productCollection.getIds();
            this.products = productCollection;
            this.filter.value = productCollection.getIds().join('|');
        },
        isSelectionDisabled() {
            return !this.acl.can('torq_dynamic_access_evolved.editor');
        }
    }
};