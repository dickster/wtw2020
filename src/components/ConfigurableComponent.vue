<template>

    <v-col  v-if="visible"
            style=""
            :cols="config.width"
            :offset="config.offset"
            >

        <component
                :is="componentType"
                :value="value"
                :config="config"
                @input="emitInput($event)"
        >
        </component>




    </v-col>

</template>


// say component is SEction.. its emitting event up that already has a path.
// .: always need to consider the


<script>

    import configurableComponentMixin from '../mixins/configurableComponentMixin'

    export default {
        mixins: [configurableComponentMixin],

        data() {
            return {}
        },

        computed: {
            componentType() {
                let type = this.config.type.trim()
                return () => import(`./configurable/${type}.vue`);
            }
        },

        methods: {
        },

        created() {
        }
        ,


    }
</script>

<style>

</style>
