<template>

    <!--TODO : add other props like elevation, colour, avatar etc...-->

    <v-card>

        <v-card-title v-if="config.title">
            {{title}}
        </v-card-title>

        <v-card-text>
            <slot name="errors">
                <v-text-field class="wtw-errors" label="valid" :rules="rules">
                </v-text-field>
            </slot>

            <configurable-component-container
                :parent="parent"
                :layout="config.layout"
                >
            </configurable-component-container>

        </v-card-text>

        <v-card-actions v-if="config.actions">
            <!--iterate over action buttons here...-->
        </v-card-actions>

    </v-card>

</template>

<script>
    import ConfigurableComponentMixin from '../../mixins/configurableComponentMixin'
    import ConfigurableComponentContainer from '../ConfigurableComponentContainer'

    export default {
        components: {ConfigurableComponentContainer},
        mixins: [ConfigurableComponentMixin],
        props:['config','actions'],

        data() {
            return {}
        },

        computed: {},

        methods: {},

        created() {

        },


    }
</script>

<style scoped>

</style>
