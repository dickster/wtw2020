<template>

    <!--should this be a form or just a container???  I dont think I need a form?/??? -->
    <v-form class="configurable-form">

        <v-text-field v-model="valid" label="wtf"></v-text-field>
        {{JSON.stringify(stuff)}}
            section here...
        <div v-if="form">

            <!--e.g.
                <component :is="Section" :bind="info" :config="{rows:[...]}"> </component>
            -->
            <component
                    :is="section"
                    :config="form"
            >
            </component>

        </div>

        <template v-else>
            <p>(no configuration given for questions in '{{form}})</p>
        </template>
    </v-form>

</template>

<script>

    import {get,set,sync} from 'vuex-pathify'
    import Section from './Section'

    export default {
        name:'config-form',
        components: {},
        inject: ['evaluationService','accessorService'],
        props: ['form'],

        methods: {
        },

        computed: {
            section() {
                return Section
            },
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
