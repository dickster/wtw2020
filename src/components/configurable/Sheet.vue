<template>

    <div>
        <v-sheet :elevation="config.elevation||''">
            <span class="title sheet-title" v-if="config.label">
                {{config.label}}
            </span>
            <v-card-text>
                <configurable-questions
                        :parent="parent"
                        :config="config">
                </configurable-questions>
            </v-card-text>
            <v-sheet-footer v-if="config.actions">

            </v-sheet-footer>
        </v-sheet>
    </div>

</template>

<script>

    import ConfigurableComponent from '../../mixins/configurableComponentMixin';
    import Form from "./Form"

    export default {
        mixins : [ConfigurableComponent],
        name: "Sheet",
        components: {Form},

        data: () => ({}),

        computed: {

        },

        methods: {


        }
    }
</script>

<style scoped>


</style>
