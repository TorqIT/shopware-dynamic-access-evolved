import template from './torq-dynamic-access-evolved-or-container.html.twig';
import './torq-dynamic-access-evolved-or-container.scss';

const { Criteria } = Shopware.Data;

/**
 * @private
 * @package services-settings
 */
export default {
    template,

    compatConfig: Shopware.compatConfig,

    emits: ['on-selection'],

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
        }
    },

    data() {
        return {
            
        };
    },

    computed: {
        

        
    },

    watch: {
        
    },

    methods: {
        addCondition() {
            this.filter.queries.push(Criteria.multi('AND', []));
        },
        onDeleteOrCondition(index){
            this.filter.queries.splice(index, 1);
        }
    }
};
