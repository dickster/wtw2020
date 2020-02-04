    <template>


     <span class="autocomplete-container">
        <v-col :cols="config.labelWidth||8" class="autocomplete-label">
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


            <v-autocomplete
                    clearable
                    :loading="loading"
                    deletable-chips
                    :item-value="config.itemValue||'value'"
                        hide-no-data
                    v-model="value"
                    :item-text="itemText"
                    :multiple="config.multiple"
                    :chips="config.chips"
                    :items="items"
                    :persistent-hint="config.persistentHint"
                    :hide-details="!config.hint"
                    :hint="config.hint"
            >
                      <template v-slot:append>
                          <v-fade-transition leave-absolute>
                              <v-tooltip left :max-width="400" v-if="config.warning">

                                  <template v-slot:activator="{ on }">
                                    <v-icon v-on="on"
                                            dark
                                            color="info"
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
                      </template>
                 </v-autocomplete>
        </v-col>
    </span>


</template>

<script>

    import ConfigurableComponent from '../../mixins/configurableComponentMixin';

    export default {
        mixins: [ConfigurableComponent],
        name: "Autocomplete",
        components: {},

        data: () => ({
            focused:false,
            menu: true,
            loading: false,
            search: '',
            itemData: null
        }),

        computed: {
            // TODO : this is a fix to get editor/dropdownlists working.
            //  need to make this a default so it can be overriden.
            // e.g. if config.items.key && config.itemValue is blank, return 'value'.
            // because we can assume all items loaded via key (from dropdown list service)
            // will return objects of the shape  {value:'hello', ...}
            itemText() {
                return this.config.items ? "value" : ""
            },

        },


        created() {
        },
        methods: {

        }
    }
</script>

<style scoped>
    .autocomplete-label {
        padding-left: 0;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        color: rgba(0, 0, 0, .54);
    }

    .autocomplete-container {
        display: flex;
        align-items: baseline;
        display: inline-flex;
        width: 100%;
        margin-top: 4px;
        padding-top: 0px;
    }

    .autocomplete-container .col {
        padding-top:0;
        padding-bottom:0;
    }


</style>
