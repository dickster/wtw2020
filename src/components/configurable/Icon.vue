<template>

    <i class="iconClass"></i>

</template>

<script>

    // need a shared utility class to deal with watch/action/mapping....

    // e.g.
    // id:'radarButton',
    // type:'icon',
    // bind: 'targetToStoreResult'
    // watch: {
    //   bind: 'insured.name'.     if blank, assumes entire data/root@ level store.
    //   delay: 300,
    //   action: {
    //     url: '...',
    //     params: {JSONata}
    //     output: {JSONata}
    //     logLevel:'none|debug|info|warning|error'
    //   }
    // }

    // TODO : make a configurableWatcher mixin which has debounce

    import ConfigurableComponent from '../../mixins/configurableComponentMixin';
    import Debounce from '../../utils/Debounce'

    export default {
        mixins : [ConfigurableComponent],
        components: {},

        data: () => ({
            debounce: new Debounce(this.performAction.bind(this), this.config.delay||300)
        }),

        computed: {
            iconClass() {
                // return config.icon,  config size
                return "fas fa-glasses fa-4x"
            },
            delay() {
                return this.config.delay||300
            }
        },

        methods: {
            performAction(newValue, oldValue) {
                this.$store.dispatch('workflowAction/perform', this.config.action)
            }
        },

        created() {
            this.$watch(
                'value',
                ()=>this.debounce.trigger(),
                {deep:true}
            );
        }


    }
</script>

<style scoped>

    .v-card__title{
        font-size:20px;
    }

</style>
