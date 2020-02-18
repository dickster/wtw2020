<template>

    <!--should this be a form or just a container???  I dont think I need a form?/??? -->
    <v-form class="configurable-form">

        <v-text-field v-model="valid" label="wtf"></v-text-field>
        {{JSON.stringify(stuff)}}
            section here...
        <div v-if="form">

            <configurable-component-container
                    :layout="form.layout"
            >
            </configurable-component-container>

        </div>

        <template v-else>
            <p>(no configuration given for questions in '{{form}})</p>
        </template>
    </v-form>

</template>

<script>

    import {get,set,sync} from 'vuex-pathify'
    import ConfigurableComponentContainer from '../ConfigurableComponentContainer'

    export default {
        name:'config-form',
        components: {ConfigurableComponentContainer},
        inject: ['evaluationService','accessorService'],
        props: ['form'],

        methods: {
        },

        computed: {
            stuff: get('data/root'),
            valid : sync('app/theme')
        },

        mounted() {

        },

        created() {

        },

        data: () => ({

        }),
    }
</script>

<style>


</style>
