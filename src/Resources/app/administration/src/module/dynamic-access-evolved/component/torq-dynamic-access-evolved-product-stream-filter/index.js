import template from './torq-dynamic-access-evolved-product-stream-filter.html.twig';
import './torq-dynamic-access-evolved-product-stream-filter.scss';

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
            productStreams: null,
            productStreamIds: this.filter.value ? this.filter.value.split('|') : []
        }
    },

    computed: {
        productStreamCriteria() {
            const criteria = new Criteria(1, 100);
            criteria.addSorting(Criteria.sort('name'));
            return criteria;
        },
        productStreamContext() {
            return { ...Shopware.Context.api, inheritance: true };
        },
        productStreamRepository() {
            return this.repositoryFactory.create('product_stream');
        },
    },

    watch: {

    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.productStreams = new EntityCollection(
                this.productStreamRepository.route,
                this.productStreamRepository.entityName,
                this.productStreamContext,
            );


            if (this.productStreamIds.length <= 0) {
                return Promise.resolve();
            }

            const criteria = new Criteria(1, 100);
            criteria.setIds(this.productStreamIds);
            criteria.addSorting(Criteria.sort('name'));

            return this.productStreamRepository.search(criteria, this.productStreamContext).then((productStreams) => {
                this.productStreams = productStreams;
            });
        },
        setIds(productStreamCollection) {
            this.productStreamIds = productStreamCollection.getIds();
            this.productStreams = productStreamCollection;

            const streamIds = productStreamCollection.getIds();

            // For product streams, we use a simple equalsAny filter on the streamIds field
            this.filter.type = "equalsAny";
            this.filter.field = "streamIds";
            this.filter.value = streamIds.join('|');
        },
        isSelectionDisabled() {
            return !this.acl.can('torq_dynamic_access_evolved.editor');
        }
    }
};
