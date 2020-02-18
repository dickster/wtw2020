<template>

    <!--should this be a form or just a container???  I dont think I need a form?/??? -->
    <v-form class="configurable-form">

        <v-text-field v-model="valid" label="wtf"></v-text-field>
        {{JSON.stringify(stuff)}}
        <div v-if="form.config">

            <!--e.g.
                <component :is="Section" :bind="info" :config="{rows:[...]}"> </component>
            -->
            <component
                    :is="'Section'"
                    :config="form.config"
            >
            </component>

        </div>

        <template v-else>
            (no configuration given for questions in '{{form}})
        </template>
    </v-form>

</template>

<script>

    import {get,set,sync} from 'vuex-pathify'

    export default {
        name:'config-form',
        components: {},
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
