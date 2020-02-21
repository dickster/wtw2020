<template>

    <span class="textfield-container">

        <!--TODO : allow for label to be in text field or beside.-->
        <v-col v-if="config.label" :cols="config.labelWidth||8" class="textfield-label">
            {{config.label}}
        </v-col>

        <!--TODO : use $listeners & $attrs on underlying components. instead of hard coding @input= etc...-->
        <v-col :cols="!config.label?12:12-(config.labelWidth||8)" style="padding-right:0;">
            <v-text-field
                    v-on="$listeners"
                    :bind="$attrs"
                    hide-details="auto"
                    :rules="rules"
                    v-model="value"
                    >
            </v-text-field>
        </v-col>
    </span>

</template>

<script>

    import ConfigurableComponentMixin from '../../mixins/configurableComponentMixin';
    import {get, set} from 'vuex-pathify';

    export default {
        inheritAttrs: false,
        mixins: [ConfigurableComponentMixin],
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
