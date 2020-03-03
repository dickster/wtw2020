<template>

    <!--Page basically wraps a bunch of configurable components in a form.  that way it gives you a place to deal with validation. -->
    <v-form v-model="valid" class="configurable-page">

        <v-btn @click="logit">
            LOG</v-btn>
        <div v-if="page">
            <v-text-field ref="errorContainer" disabled class="wtw-errors" label="valid" v-model="valid" :rules="rules">
            </v-text-field>
            <configurable-component-container
                :layout="page.layout">
            </configurable-component-container>
        </div>

        <template v-else>
            <p>(no configuration given for questions in {{page}})</p>
        </template>
    </v-form>

</template>

<script>

    import {get, set, sync} from 'vuex-pathify'
    import ConfigurableComponentContainer from "../ConfigurableComponentContainer";

    export default {
        components: {ConfigurableComponentContainer},
        inject: ['evaluationService', 'accessorService'],
        props: ['page'],

        methods: {
            logit() {
                this.$store.dispatch('log/log', {msg:'foo', level:'debug'})
//                this.$store.dispatch('log', {msg:'foo', level:'debug'})
            }
        },

        computed: {
            pageId() {
                return this.page.id
            },
            root: get('data/root'),
            // TODO : put this validation stuff into container mixin.
            valid: sync('app/validation@:pageId'),
            rules() {
                return this.page.validation ?
                    [ this.evaluationService.ruleFor(this.page.validation) ] :
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
        }),
    }
</script>

<style>


</style>
