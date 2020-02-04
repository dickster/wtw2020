<template>


        <v-slider
                @click:append="emit($event)"
                :append-icon="config.appendIcon"
                :thumb-label="config.thumbLabel"
                :step="config.step"
                hide-details
                :max="config.max"
                :min="config.min"
                v-model="value">
        </v-slider>



</template>

<script>

    import ConfigurableComponent from '../../mixins/configurableComponentMixin';

    export default {
        mixins : [ConfigurableComponent],
        name: "Slider",
        components: {},

        data: () => ({}),

        computed: {

        },

        methods: {


        }
    }
</script>

<style scoped>

    .v-input__slider {
        margin-top:30px;
    }


</style>
