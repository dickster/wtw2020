<template>

    <!--TODO : add all sorts of other standard button options...icons, text, raised/depressed/outline/text/fab etc...-->
    <v-btn @click="perform">
        {{config.label}}
    </v-btn>

</template>

<script>

    import ConfigurableComponentMixin from '../../mixins/configurableComponentMixin';
    import {get, set} from 'vuex-pathify';

    export default {
        inheritAttrs: true,
        mixins: [ConfigurableComponentMixin],
        components: {},

        data: () => ({}),

        computed: {
        }
        ,

        created() {
        }
        ,

        methods: {
            perform() {
                if (this.config.action) {
                    this.$store.dispatch('workflowAction/perform', this.config.action)
                }
                // do something with config.action.
                //  e.g. store.dispatch('action', this.config.action)
               // need to ensure this action has an id.  should enforce it.
                // use widgets id/label if it doesn't exist.
            }
        }
    }
</script>

<style scoped>

</style>
