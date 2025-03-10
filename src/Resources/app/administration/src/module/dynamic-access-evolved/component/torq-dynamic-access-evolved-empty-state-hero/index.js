import template from './torq-dynamic-access-evolved-empty-state-hero.html.twig';
import './torq-dynamic-access-evolved-empty-state-hero.scss';

/**
 * @private
 */
export default {
    template,

    compatConfig: Shopware.compatConfig,

    props: {
        title: {
            type: String,
            required: true,
        },

        assetPath: {
            type: String,
            required: false,
            default: '',
        },

        description: {
            type: String,
            required: false,
            default: '',
        },

        hideDescription: {
            type: Boolean,
            required: false,
            default: false,
        },
    },

    computed: {
        imagePath() {
            return this.assetPath ||
                '/administration/static/img/empty-states/promotion-v2-empty-state-hero.svg';
        },

        showDescription() {
            return !this.hideDescription && this.description && this.description.length > 0;
        },

        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },

        actionSlotsAvailable() {
            if (this.isCompatEnabled('INSTANCE_SCOPED_SLOTS')) {
                return !!this.$slots.actions || !!this.$scopedSlots.actions;
            }

            return !!this.$slots.actions;
        },
    },
};
