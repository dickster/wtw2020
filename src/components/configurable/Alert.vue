<template>

    <v-card>
          <v-card-title  class="red lighten-3 ">
              <v-icon >warning</v-icon>{{config.header}}
          </v-card-title>
        <v-card-text class="red lighten-5 ">
            <span v-html="config.text"></span>
        </v-card-text>
    </v-card>

</template>

<script>

    import ConfigurableComponent from '../../mixins/configurableComponentMixin';

    export default {
        mixins : [ConfigurableComponent],
        name: "Alert",
        components: {},

        data: () => ({}),

        computed: {

        },

        methods: {


        }
    }
</script>

<style scoped>

    .v-card__title{
        font-size:20px;
    }

</style>
