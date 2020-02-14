<template>

    <!--should this be a form or just a container???  I dont think I need a form?/??? -->
    <div class="dynamic-form">

        <!--Todo: change this to a simple form component that contains ConfigurableComponents
        collection. this is because SEctions and other components will need that functionality without having the form.

        -->

        {{JSON.stringify(stuff)}}
        <div v-if="page.config">
            <configurable-component-container
                    v-on="listeners"
                    v-bind="page.config.attrs"
                    :config="page.config"
            >
            </configurable-component-container>
        </div>

        <template v-else>
            (no configuration given for questions)
        </template>
    </div>


</template>


<script>

    // TODO: don't have sections in config.
    // just have TYPE=SECTION which has its own child config??
    //  for flipSection it has subsections = back/front.

    import DynamicSection from './DynamicSection'
    import ConfigurableComponentContainer from './ConfigurableComponentContainer'
    import {get, set} from 'vuex-pathify'
    // import configurableComponentContainerMixin from '../mixins/configurableComponentContainerMixin'


    export default {
        // mixins: [configurableComponentContainerMixin],
        components: {ConfigurableComponentContainer, DynamicSection},
        inject: ['evaluationService'],  //accessorService
        props: ['page'],

        methods: {
            // TODO : maybe inject accessor. can be VUE based or whatever else...
            // accessor does value, handleInput, emit.  that way this component is not tied to VUEX.

            valueFor(widget) {
                this.$store.get('data/root@' + widget.bind)
            },

            handleInput($event) {
                let path = $event.path || []
                if (this.page.bind) path = [this.page.bind,...path]
                console.log('setting ' + path)

                // THIS should be injected...or at least have the prefix configurable
                this.$store.set('data/root@' + path.join('.'), $event.value)
            },

        },

        computed: {
            stuff: get('data/root'),
            listeners() {
                return {
                    ...this.page.config.listeners,
                    'wtw-input': this.handleInput,
                }
            },

        },

        mounted() {

        },

        created() {

        },

        data: () => ({}),
    }
</script>

<style>


</style>
