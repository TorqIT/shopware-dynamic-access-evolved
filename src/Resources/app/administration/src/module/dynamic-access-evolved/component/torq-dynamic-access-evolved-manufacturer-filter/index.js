import template from './torq-dynamic-access-evolved-manufacturer-filter.html.twig';
import './torq-dynamic-access-evolved-manufacturer-filter.scss';

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
            manufacturers: null,
            manufacturerIds: this.filter.value == "" ? [] : this.filter.value.split('|')
        }
    },

    computed: {        
        manufacturerCriteria() {
            const criteria = new Criteria(1, 100);
            criteria.addSorting(Criteria.sort('name'));
            return criteria;
        },
        manufacturerContext() {
            return { ...Shopware.Context.api, inheritance: true };
        },
        manufacturerRepository() {
            return this.repositoryFactory.create('product_manufacturer');
        }
    },

    watch: {
        
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.manufacturers = new EntityCollection(
                this.manufacturerRepository.route,
                this.manufacturerRepository.entityName,
                this.manufacturerContext,
            );


            if (this.manufacturerIds.length <= 0) {
                return Promise.resolve();
            }

            const criteria = new Criteria(1, 25);
            criteria.addSorting(Criteria.sort('name'));
            criteria.setIds(this.manufacturerIds);

            return this.manufacturerRepository.search(criteria, this.manufacturerContext).then((manufacturers) => {
                this.manufacturers = manufacturers;
            });
        },
        setIds(manufacturerCollection) {
            this.manufacturerIds = manufacturerCollection.getIds();
            this.manufacturers = manufacturerCollection;
            this.filter.value = manufacturerCollection.getIds().join('|');
        },
        isSelectionDisabled() {
            return !this.acl.can('torq_dynamic_access_evolved.editor');
        }
    }
};