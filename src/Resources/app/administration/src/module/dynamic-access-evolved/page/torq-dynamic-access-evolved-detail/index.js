import template from './torq-dynamic-access-evolved-detail.html.twig';
import './torq-dynamic-access-evolved-detail.scss';
import { isSimpleManufacturerRule } from '../../utils/manufacturer-rule-helper';

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

            return criteria;
        },
        tooltipSave() {
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

        },
        isSimpleManufacturerRule() {
            // Check if the entire rule is a simple manufacturer rule
            // This matches the backend logic: single OR container with single AND condition containing only manufacturer filters
            if (!this.dae || !this.dae.filter) {
                return false;
            }

            return isSimpleManufacturerRule(this.dae.filter);
        }
    },

    watch: {
        daeId() {
            this.createdComponent();
        },
        dae: function (newValue){
            if(newValue && !newValue.filter){
                newValue.filter = Criteria.multi('OR', [
                    Criteria.multi('AND',[Criteria.equalsAny('', [])])
                ]);
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
        }
    },
};
