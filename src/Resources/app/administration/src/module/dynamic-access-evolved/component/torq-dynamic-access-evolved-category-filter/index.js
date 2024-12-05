import template from './torq-dynamic-access-evolved-category-filter.html.twig';
import './torq-dynamic-access-evolved-category-filter.scss';

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
            categories: null,
            categoryIds:  this.filter.queries == null || this.filter.queries.length == 0 ? [] : this.filter.queries[0].value.split('|')
        }
    },

    computed: {        
        categoryCriteria() {
            const criteria = new Criteria(1, 100);
            criteria.addSorting(Criteria.sort('name'));
            return criteria;
        },
        categoryContext() {
            return { ...Shopware.Context.api, inheritance: true };
        },
        categoryRepository() {
            return this.repositoryFactory.create('category');
        },
    },

    watch: {
        
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.categories = new EntityCollection(
                this.categoryRepository.route,
                this.categoryRepository.entityName,
                this.categoryContext,
            );


            if (this.categoryIds.length <= 0) {
                return Promise.resolve();
            }

            const criteria = new Criteria(1, 100);
            criteria.setIds(this.categoryIds);
            criteria.addSorting(Criteria.sort('name'));

            return this.categoryRepository.search(criteria, this.categoryContext).then((categories) => {
                this.categories = categories;
            });
        },
        setIds(categoryCollection) {
            this.categoryIds = categoryCollection.getIds();
            this.categories = categoryCollection;

            const catIds = categoryCollection.getIds();

            this.filter.type = "multi";
            this.filter.operator = "or";

            this.filter.queries = [
                Criteria.equalsAny('categories.id', catIds),
                Criteria.equalsAny('categoriesRo.id', catIds)
            ];

        },
        getCategoryBreadcrumb(category) {
            if (!category.breadcrumb || Object.keys(category.breadcrumb).length === 0) {
                return category.name;
            }

            return Object.values(category.breadcrumb).join(' / ');
        },
        isSelectionDisabled() {
            return !this.acl.can('torq_dynamic_access_evolved.editor');
        }
    }
};