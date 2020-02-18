<template>

    <v-card>
        <v-card-title v-if="config.label">{{config.label}}</v-card-title>
        <v-card-text>
            <configurable-component-container
                    :config="config.config"
                    :parent="[...(config.bind||[]),...(parent||[])]"
            >

            </configurable-component-container>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
    </v-card>

</template>


<script>


    import ConfigurableComponentContainer from "../ConfigurableComponentContainer";
    export default {
        props: [
            'config','parent'
        ],
        components: {ConfigurableComponentContainer},

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
