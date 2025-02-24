import template from './torq-dynamic-access-evolved-detail.html.twig';
import './torq-dynamic-access-evolved-detail.scss';

/**
 * @package checkout
 */

const { Mixin } = Shopware;
const { Criteria } = Shopware.Data;

export default {
    template,

    inject: [
        'repositoryFactory',
        'acl',
    ],

    mixins: [
        Mixin.getByName('listing'),
        'placeholder',
    ],

    props: {
        daeId: {
            type: String,
            required: false,
            default() {
                return null;
            },
        },
    },

    data() {
        return {
            isLoading:false,
            dae: null,
            isSaveSuccessful: false
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle(this.identifier),
        };
    },

    computed: {
        identifier() {
            return this.placeholder(this.dae, 'name');
        },

        daeRepository() {
            return this.repositoryFactory.create('torq_dynamic_access_evolved');
        },

        isCreateMode() {
            return this.$route.name === 'sw.promotion.v2.create.base';
        },              
        daeCriteria() {
            const criteria = (new Criteria(1, 1))
              //  .addAssociation('discounts.promotionDiscountPrices')
                //.addAssociation('discounts.discountRules')
                //.addAssociation('salesChannels');
            ;

            // criteria.getAssociation('discounts')
            //     .addSorting(Criteria.sort('createdAt', 'ASC'));

            // criteria.getAssociation('individualCodes');

            return criteria;
        },
        tooltipSave() {
            // if (!this.acl.can('promotion.editor')) {
            //     return {
            //         message: this.$tc('sw-privileges.tooltip.warning'),
            //         disabled: this.acl.can('category.editor'),
            //         showOnDisabledElements: true,
            //     };
            // }

            const systemKey = this.$device.getSystemKey();

            return {
                message: `${systemKey} + S`,
                appearance: 'light',
            };
        },
        tooltipCancel() {
            return {
                message: 'ESC',
                appearance: 'light',
            };
        },
        canAccessLabel(){

            if(!this.dae){
                return '';
            }
            else if(this.dae.canOnlyAccess === true){
                return this.$tc('torq-dynamic-access-evolved.detail.conditions.canOnlyAccess.canAccess');
            }
            return this.$tc('torq-dynamic-access-evolved.detail.conditions.canOnlyAccess.cannotAccess');

        }
    },

    watch: {
        daeId() {
            this.createdComponent();
        },
        dae: function (newValue){
            if(newValue && !newValue.filter){
                newValue.filter = Criteria.multi('OR', []);
            }
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            Shopware.ExtensionAPI.publishData({
                id: 'torq-dynamic-access-evolved__dae',
                path: 'torq_dynamic_access_evolved',
                scope: this,
            });

            this.isLoading = true;

            if (!this.daeId) {

                this.dae = this.daeRepository.create();
                
                this.isLoading = false;

                return;
            }

            this.loadEntityData();
        },

        loadEntityData() {
            if (!this.daeId) {
                return Promise.resolve();
            }

            return this.daeRepository.get(this.daeId, Shopware.Context.api, this.daeCriteria)
                .then((dae) => {
                    if (dae === null) {
                        return;
                    }

                    this.dae = dae;

                    if (!this.dae || this.dae.length < 1) {
                        return;
                    }

                    //Shopware.State.commit('swPromotionDetail/setPromotion', this.promotion);
                }).finally(() => {
                    this.isLoading = false;
                });
        },
        onSave() {
            if (!this.daeId) {
                this.createDae();

                return;
            }

            this.saveDae();

        },
        createDae() {
            return this.saveDae().then(() => {
                this.$router.push({ name: 'torq.dynamic.access.evolved.detail', params: { id: this.dae.id } });
            });
        },

        async saveDae() {
            this.isLoading = true;


            try {
                if(this.dae.canOnlyAccess == null)
                    this.dae.canOnlyAccess = false;
                await this.daeRepository.save(this.dae);
                this.isSaveSuccessful = true;
                await this.loadEntityData();
            } catch (e) {
                this.isLoading = false;
                this.createNotificationError({
                    message: this.$tc('global.notification.notificationSaveErrorMessage', 0, {
                        entityName: this.dae.name,
                    }),
                });
            } finally {

            }
        },
        saveFinish() {
            this.isSaveSuccessful = false;
        },
        onCancel() {
            this.$router.push({ name: 'torq.dynamic.access.evolved.list' });
        },

    },
};
