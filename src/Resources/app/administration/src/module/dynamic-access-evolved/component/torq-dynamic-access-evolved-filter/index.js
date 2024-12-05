import template from './torq-dynamic-access-evolved-filter.html.twig';
import './torq-dynamic-access-evolved-filter.scss';

const { Criteria } = Shopware.Data;

/**
 * @private
 * @package services-settings
 */
export default {
    template,

    compatConfig: Shopware.compatConfig,

    emits: ['deleteAndCondition'],

    inject: [
        'acl',
    ],

    props: {
        filter: {
            type: Criteria.Filters,
            required: false,
            default() {
                return null;
            },
        },
        index: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            filterTypes: [
                {
                    filterField: 'id',
                    filterName: this.$tc('torq-dynamic-access-evolved.detail.conditions.product')
                },
                {
                    filterField: 'categories.id',
                    filterName: this.$tc('torq-dynamic-access-evolved.detail.conditions.category')
                },
                {
                    filterField: 'manufacturer.id',
                    filterName: this.$tc('torq-dynamic-access-evolved.detail.conditions.manufacturer')
                }
            ],
            selectedFilter:'id'
        }
    },

    computed: {        

    },

    watch: {
        
    },

    methods: {
        deleteAndCondition(){
            this.$emit('deleteAndCondition', this.index);
        }
    }
};
