<template>

    <span class="textfield-container">


        <v-col v-if="config.label" :cols="config.labelWidth||8" class="textfield-label">
            {{config.label}}
        </v-col>

        <v-col :cols="!config.label?12:12-(config.labelWidth||8)" style="padding-right:0;">
            <v-text-field
                   :hide-details="!valid"
                   :append-icon="config.appendIcon"
                   :error-messages="errorMessages"
                   @change="emit($event)"
                   v-model="value">
            </v-text-field>
        </v-col>
    </span>

</template>

<script>

    import ConfigurableComponent from '../../mixins/configurableComponentMixin';
    import {get, set} from 'vuex-pathify';


    export default {
        mixins: [ConfigurableComponent],
        components: {},

        data: () => ({

        }),

        computed: {

        },

        created() {
        },

        methods: {}
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
