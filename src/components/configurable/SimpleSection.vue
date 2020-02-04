<template>

    <div>
        <v-card>
            <!--TODO : maybe use sheet instead?-->
            <v-card-title v-if="config.label">{{config.label}}</v-card-title>
            <v-card-text>
                <configurable-questions
                                        ref="childQuestions"
                                        :parent="parent"
                                        :config="config"
                ></configurable-questions>
            </v-card-text>
            <v-card-actions>
                <!--iterate over buttons-->
            </v-card-actions>
        </v-card>
    </div>


</template>


<script>
    import DynamicForm from '../DynamicForm';

    export default {
        name: 'simple-section',
        props: [
            'config','parent'
        ],
        components: {DynamicForm},

        data: () => ({

        }),

        computed: {

        },

        created() {
        },

        methods: {


        }
    }
</script>


<style scoped>



</style>
