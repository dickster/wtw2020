<template>

    <div>
        <v-card :elevation="config.elevation||''">
            <v-card-title v-if="config.label">
                {{config.label}}
            </v-card-title>
            <v-card-text>
                <configurable-questions
                        :parent="parent"
                        :config="config">
                </configurable-questions>
            </v-card-text>
            <v-card-actions v-if="config.actions">

            </v-card-actions>
        </v-card>
    </div>

</template>

<script>

    import ConfigurableComponent from '../../mixins/configurableComponentMixin';
    import DynamicForm from "../DynamicForm"

    export default {
        mixins : [ConfigurableComponent],
        name: "Card",
        components: {DynamicForm},

        data: () => ({}),

        computed: {

        },

        methods: {


        }
    }
</script>

<style scoped>


</style>
