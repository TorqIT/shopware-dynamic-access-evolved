import template from './torq-dynamic-access-evolved-and-container.html.twig';
import './torq-dynamic-access-evolved-and-container.scss';

const { Criteria } = Shopware.Data;

/**
 * @private
 * @package services-settings
 */
export default {
    template,

    compatConfig: Shopware.compatConfig,

    emits: ['deleteOrCondition'],

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
            required: true,            
        },
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
        onAddAndCondition() {
            this.filter.queries.push(Criteria.equalsAny('', []));
        },
        onDeleteOrCondition(){
            this.$emit('deleteOrCondition', this.index);
        },
        onDeleteAndCondition(index){
            this.filter.queries.splice(index, 1);
        }
    }
};
