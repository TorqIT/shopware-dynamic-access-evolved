import template from './torq-dynamic-access-evolved-sales-channel-select.html.twig';

export default {
    template,

    compatConfig: Shopware.compatConfig,

    inject: [
        'repositoryFactory',
        'ruleConditionDataProviderService',
        'feature',
    ],

    emits: ['update:collection'],

    props: {
        collection: {
            type: Array,
            required: false,
            default: null,
        },

        localMode: {
            type: Boolean,
            required: false,
            default() {
                return false;
            },
        },
    },

    data() {
        return {
        };
    },

    computed: {

        listeners() {
            if (this.isCompatEnabled('INSTANCE_LISTENERS')) {
                return this.$listeners;
            }

            return {};
        },
    },

    methods: {
        onChange(collection) {
            this.$emit('update:collection', collection);
        },
    },
};