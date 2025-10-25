import template from './torq-dynamic-access-evolved-list.html.twig';
import './torq-dynamic-access-evolved-list.scss';
import { isSimpleManufacturerRule } from '../../utils/manufacturer-rule-helper';

const { Mixin } = Shopware;
const { Criteria } = Shopware.Data;

export default {
    template,

    compatConfig: Shopware.compatConfig,

    inject: [
        'repositoryFactory',
        'acl',
    ],

    mixins: [
        Mixin.getByName('listing'),
    ],

    data() {
        return {
            isLoading: true,
            dynamicAccessEvolved: null,
            total: 0,
            showDeleteModal: false,
            sortBy: 'createdAt',
            sortDirection: 'DESC',
            searchConfigEntity: 'torq_dynamic_access_evolved',
        };
    },

    metaInfo() {
        return {
            title: this.$tc('torq-dynamic-access-evolved.list.textTitle'),
        };
    },

    computed: {
        dynamicAccessEvolvedRepository() {
            return this.repositoryFactory.create('torq_dynamic_access_evolved');
        },

        dynamicAccessEvolvedCriteria() {
            return (new Criteria(this.page, this.limit))
                .setTerm(this.term)
                .addSorting(Criteria.sort(this.sortBy, this.sortDirection));
        },

        dynamicAccessEvolvedColumns() {
            return this.getDynamicAccessEvolvedColumns();
        },

        addButtonTooltip() {
            return {
                message: this.$tc('sw-privileges.tooltip.warning'),
                disabled: this.acl.can('torq_dynamic_access_evolved.creator'),
                showOnDisabledElements: true,
                position: 'bottom',
            };
        },

        dateFilter() {
            return Shopware.Filter.getByName('date');
        },
    },

    methods: {
        async getList() {
            this.isLoading = true;

            const criteria = await this.addQueryScores(this.term, this.dynamicAccessEvolvedCriteria);
            if (!this.entitySearchable) {
                this.isLoading = false;
                this.total = 0;

                return false;
            }
            return this.dynamicAccessEvolvedRepository.search(criteria).then((searchResult) => {
                this.isLoading = false;
                this.total = searchResult.total;

                // Add computed restrictsManufacturers property to each item
                searchResult.forEach(item => {
                    item.restrictsManufacturers = this.restrictsManufacturers(item);
                });

                this.dynamicAccessEvolved = searchResult;

                return this.dynamicAccessEvolved;
            });
        },

        onChangeLanguage() {
            this.getList();
        },

        getDynamicAccessEvolvedColumns() {
            return [{
                property: 'name',
                label: 'torq-dynamic-access-evolved.list.columnName',
                routerLink: 'torq.dynamic.access.evolved.detail',
                inlineEdit: 'string',
                allowResize: true,
                primary: true,
            }, {
                property: 'active',
                label: 'torq-dynamic-access-evolved.list.columnActive',
                inlineEdit: 'boolean',
                allowResize: true,
                align: 'center',
            }, {
                property: 'validFrom',
                label: 'torq-dynamic-access-evolved.list.columnValidFrom',
                inlineEdit: 'date',
                allowResize: true,
                align: 'center',
            }, {
                property: 'validUntil',
                label: 'torq-dynamic-access-evolved.list.columnValidUntil',
                inlineEdit: 'date',
                allowResize: true,
                align: 'center',
            }, {
                property: 'restrictsManufacturers',
                label: 'torq-dynamic-access-evolved.list.columnRestrictsManufacturers',
                allowResize: true,
                align: 'center',
                sortable: false,
            }];
        },

        updateTotal({ total }) {
            this.total = total;
        },

        onCreate() {
            this.$router.push({ name: 'torq.dynamic.access.evolved.create' });
        },

        /**
         * Check if a rule restricts manufacturers (client-side computation)
         * Returns true if the rule is a simple manufacturer rule
         */
        restrictsManufacturers(rule) {
            if (!rule.filter) {
                return false;
            }

            try {
                const filter = typeof rule.filter === 'string'
                    ? JSON.parse(rule.filter)
                    : rule.filter;
                return isSimpleManufacturerRule(filter);
            } catch (e) {
                return false;
            }
        },
    },
};
