<template>

    <div :class="config.class">
          {{label}}
    </div>

</template>

<script>

    import ConfigurableComponent from '../../mixins/configurableComponentMixin';

    export default {
        mixins : [ConfigurableComponent],
        name: "Label",
        components: {},

        data: () => ({}),

        computed: {
            label() {
                return this.config.label||this.value
            }

        },

        methods: {


        }
    }
</script>

<style scoped>


</style>
