<template>

    <span class="yn-container">
        <v-col cols="9" class="yn-label">
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

        <v-col cols="3" style="padding-right:0;">


            <v-btn-toggle
                    :mandatory="!!value"
                    hide-details
                    @change="emit($event,config)"
                    v-model="value">
                <v-btn block small
                       hide-details
                       value="yes">Yes
                </v-btn>
                <v-btn block
                       small
                       hide-details
                       value="no">No
                </v-btn>
            </v-btn-toggle>
        </v-col>
    </span>

</template>

<script>

    import ConfigurableComponent from '../../mixins/configurableComponentMixin';

    export default {
        mixins: [ConfigurableComponent],
        name: "Label",
        components: {},

        data: () => ({}),

        computed: {
            width() {
                return 'width:' + this.config.width + '%;' +
                    'margin-left:' + this.config.marginLeft + '%;'
            },
        },

        methods: {}
    }
</script>

<style scoped>

    .v-btn {
        min-width: 50% !important;
        max-width: 50% !important;
        height:32px !important;
    }

    .yn-label {
        padding-left: 0;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        color: rgba(0, 0, 0, .54);
    }

    .yn-container {
        display: flex;
        align-items: baseline;
        display: inline-flex;
        width: 100%;
        margin-top: 4px;
        padding-top: 0px;
    }

    .v-btn-toggle {
        width: 100%;
        padding-top:12px;
        justify-content: flex-end;
    }

</style>
