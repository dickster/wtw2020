<template>

     <span class="chipgroup-container">
        <v-col :cols="config.labelWidth||8" class="chipgroup-label" >
            {{config.label}}
             <v-fade-transition leave-absolute>
                              <v-tooltip right :max-width="400" v-if="config.warning">

                                  <template v-slot:activator="{ on }">
                                    <v-icon v-on="on"
                                            dark
                                            :color="config.warning.color||'info'"
                                            v-show="config.warning.icon && evaluate(config.warning.expression)">
                                        {{config.warning.icon||'announcement'}}
                                    </v-icon>
                                  </template>
                                  <span>
                                    <span v-if="config.warning.tooltip"
                                          class="component-warning"
                                          v-html="config.warning.tooltip">
                                    </span>
                                  </span>
                              </v-tooltip>
                          </v-fade-transition>
            </v-col>

        <v-col :cols="12-(config.labelWidth||8)" class="chipgroup">
             <v-chip-group
                     active-class="primary lighten-2"
                     v-model="value"
                     :multiple="config.multiple"
                     mandatory
             >
                <v-chip

                        label
                        v-for="(item,i) in localItems"
                        :key="i"
                        :value="valueFor(item)">
                    {{ textFor(item) }}
                </v-chip>
            </v-chip-group>
        </v-col>
    </span>

</template>

<script>
    import ConfigurableComponent from '../../mixins/configurableComponentMixin';

    export default {
        mixins: [ConfigurableComponent],
        components: {},

        data: () => ({
            itemData: null

        }),

        computed: {
            localItems() {
                return this.items
            }
        },

        methods: {
            valueFor(item) {
                if (item && typeof item == 'object') {
                    return item[this.config.itemValue || 'value']
                }
                return item
            },
            textFor(item) {
                if (item && typeof item == 'object') {
                    return item["value" || 'text']
                }
                return item
            }


        }
    }
</script>

<style scoped>

    .chipgroup {
        display: flex;
        padding-right: 0;
        justify-content: flex-end;
    }

    .chipgroup-label {
        padding-left: 0;
        height: 20px;
        line-height: 12px;
        font-size: 16px;
        color: rgba(0, 0, 0, .54);
    }

    .chipgroup-container {
        display: flex;
        align-items: center;
        width: 100%;
        margin-top: 4px;
        padding-top: 0px;
    }

    .v-btn-toggle {
        width: 100%;
        justify-content: flex-end;
    }
</style>
