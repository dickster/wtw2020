<template>

    <!--blargh. this doesn't work!  something to do with missing material icons??
        doesn't respond to click events.
    -->

    <v-checkbox
            :label="config.label"
            v-model="value"
            hide-details>
    </v-checkbox>

</template>

<script>

    import ConfigurableComponent from '../../mixins/configurableComponentMixin'

    export default {
        mixins: [ConfigurableComponent],
        components: {},

        data: () => ({}),

        computed: {},

        methods: {}
    }
</script>

<style scoped>


</style>
