<template>

    <!--should this be a form or just a container???  I dont think I need a form?/??? -->
    <v-form v-model="valid" class="configurable-form">


        VALID: {{valid2}}
        <!--<v-text-field v-model="valid" label="valid (debug)"></v-text-field>-->
        <div v-if="form">
            <v-text-field ref="errorContainer" disabled class="wtw-errors" label="valid" v-model="valid" :rules="rules">
            </v-text-field>

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

    import {get, set, sync} from 'vuex-pathify'
    import ConfigurableComponentContainer from '../ConfigurableComponentContainer'

    export default {
        name: 'config-form',
        components: {ConfigurableComponentContainer},
        inject: ['evaluationService', 'accessorService'],
        props: ['form'],

        methods: {},

        computed: {
            formId() {
                return this.form.id
            },
            root: get('data/root'),
            valid: sync('app/validation@formX'),
            rules() {
                return this.form.validation ?
                    [ this.evaluationService.ruleFor(this.form.validation) ] :
                    []
            }
        },

        mounted() {

        }
        ,

        watch: {
            root(val) {
                // currently this watches for *any* data changes which may be a bit too broad
                // but it won't break anything;   just may waste a couple of cycles.
                console.log('forcing validation')
                    let container = this.$refs.errorContainer
                container.validate()
                container.$forceUpdate()
            }
        },

        created() {

        }
        ,

        data: () => ({
            valid2:false
        }),
    }
</script>

<style>


</style>
