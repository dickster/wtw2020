<template>

    <span class="textfield-container">

        <!--TODO : allow for label to be in text field or beside.-->
        <v-col v-if="config.label" :cols="config.labelWidth||8" class="textfield-label">
            {{config.label}}
        </v-col>

                    <!--v-bind="$attrs"-->
                    <!--v-on="$listeners"-->
                    <!--:append-icon="appendIcon"-->
                    <!--:prepend-icon="prependIcon"-->
        <v-col :cols="!config.label?12:12-(config.labelWidth||8)" style="padding-right:0;">
            <v-text-field
                    hide-details="auto"
                    :rules="rules"
                    @change="emit('change',$event)"
                    v-model="value">
            </v-text-field>
        </v-col>
    </span>

</template>

<script>

    import ConfigurableComponent from '../../mixins/configurableComponentMixin';
    import {get, set} from 'vuex-pathify';


    export default {
        inheritAttrs: false,
        mixins: [ConfigurableComponent],
        components: {},

        data: () => ({}),

        computed: {
            prependIcon() {
                return this.config.prependIcon
            },
            appendIcon() {
                return this.config.appendIcon
            }
        }
        ,

        created() {
        }
        ,

        methods: {
        }
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
