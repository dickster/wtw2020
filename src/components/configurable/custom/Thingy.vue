<template>

    <div>
        CUSTOM COMPONENT:
        when configuring this, use type: "custom/[componentName]",
        as opposed to type:"[componentName]"
    </div>

</template>

<script>

    import ConfigurableComponentMixin from '../../../mixins/configurableComponentMixin'
    import {get, set} from 'vuex-pathify'

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
        }
    }
</script>

<style scoped>

    .textfield-label {
        padding-left: 0;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        color: rgba(0, 0, 0, .54);
    }

    .textfield-container {
        display: flex;
        align-items: baseline;
        display: inline-flex;
        width: 100%;
        padding-top: 0px;
    }
</style>
