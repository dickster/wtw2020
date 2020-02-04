<template>

    <div>


         <span class="textfield-container">
        <v-col :cols="config.labelWidth||8" class="textfield-label">
            {{config.label}}
            <v-tooltip right :max-width="400" v-if="config.warning">

                <template v-slot:activator="{ on }">
                    <v-icon
                            dark
                            color="info"
                            v-on="on">
                        help
                    </v-icon>
                </template>
                    <span>
                        <span v-if="config.warning.tooltip"
                              class="component-warning"
                              v-html="config.warning.tooltip">
                        </span>
                    </span>
                </v-tooltip>
            </v-col>

            <v-col :cols="12-(config.labelWidth||8)" style="padding-right:0;">


                  <div data-v-3f14b256="" class="v-input v-input--hide-details  theme--light v-text-field v-text-field--is-booted">
                    <div class="v-input__control">
                        <div class="v-input__slot">
                            <div class="v-text-field__slot">
                                <!--TODO: all of these container HTML is here to make it look like vuetify text fields.
                                should wrap this up in a component.
                                -->
                                <money v-model="value" v-bind="money"></money>
                            </div>
                        </div>
                    </div>
                </div>

        </v-col>
    </span>


    </div>

</template>

<script>

    import ConfigurableComponent from '../../mixins/configurableComponentMixin';

    export default {
        mixins: [ConfigurableComponent],
        components: {},


        data: () => ({

        }),

        computed: {
            show() {
                if (this.config.tooltipExpression) {
                    // return this.$evaluate(this.config.tooltipExpression)
                }
                return true
            }
        },

        created() {
        },
        methods: {}
    }
</script>

<style scoped>

    .textfield-label {
        padding-left: 0;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        color: rgba(0, 0, 0, .54);
    }

    .textfield-container {
        display: flex;
        align-items: baseline;
        display: inline-flex;
        width: 100%;
        padding-top: 0px;
    }
</style>
