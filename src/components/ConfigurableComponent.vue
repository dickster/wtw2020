<template>

    <v-col  v-if="visible"
            style=""
            :cols="config.width"
            :offset="config.offset"
            >

        <component
                :is="componentType"
                :parent="parent"
                :config="config"
        >
        </component>

    </v-col>

</template>



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
