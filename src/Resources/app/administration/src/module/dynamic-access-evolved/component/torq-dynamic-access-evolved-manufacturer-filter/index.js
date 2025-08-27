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
            manufacturerIds: this.getManufacturerIdsFromFilter()
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
        getManufacturerIdsFromFilter() {
            // Handle new format (queries array)
            if (this.filter.queries && this.filter.queries.length > 0) {
                const firstQuery = this.filter.queries[0];
                if (firstQuery.value) {
                    // Value could be a string or array
                    if (Array.isArray(firstQuery.value)) {
                        return firstQuery.value;
                    } else if (typeof firstQuery.value === 'string') {
                        return firstQuery.value.split('|').filter(id => id.length > 0);
                    }
                }
                return [];
            }
            // Handle old format (direct value property) for backwards compatibility
            else if (this.filter.value && this.filter.value !== "") {
                return this.filter.value.split('|').filter(id => id.length > 0);
            }
            
            return [];
        },
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
            
            const manufacturerIds = manufacturerCollection.getIds();
            
            // Use proper Criteria structure like the category filter does
            this.filter.type = "multi";
            this.filter.operator = "or";
            
            this.filter.queries = [
                Criteria.equalsAny('manufacturer.id', manufacturerIds)
            ];
        },
        isSelectionDisabled() {
            return !this.acl.can('torq_dynamic_access_evolved.editor');
        }
    }
};