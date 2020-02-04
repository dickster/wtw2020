<template>

    <div>



            <v-checkbox
                    @change="emit($event)"
                    color="primary"
                    :label="config.label"
                    v-model="value"

                    hide-details>
            </v-checkbox>



    </div>

</template>

<script>

    import ConfigurableComponent from '../../mixins/configurableComponentMixin';

    export default {
        mixins: [ConfigurableComponent],
        name: "Label",
        components: {},

        data: () => ({}),

        computed: {},

        methods: {}
    }
</script>

<style scoped>


</style>
