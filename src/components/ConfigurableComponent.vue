<template>

    <!--TODO: add configurable transition names.-->
    <!--v-on="$attrs" -->
    <!-- that way i can globally set disabled attribute for all in parent. -->


    <v-col  v-if="visible"
            style=""
            :cols="config.width"
            :offset="config.offset"
            :key="config.bind">

        <component
                @wtw-event="handleEvent($event)"
                :is="componentType"
                :config="config"
                :parent="parent"
        >
        </component>

    </v-col>



</template>

<script>

    import configurableComponentMixin from '../mixins/configurableComponentMixin'

    export default {
        mixins: [configurableComponentMixin],
        inject: ['evaluationService'],

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

            handleEvent($event) {
                // throw this up to parent to deal with...
                this.$emit('wtw-event', $event)
            },

            emit($event) {
                if (this.config.emit) {
                    this.$emit('b1change', {
                        source: this.config.bind,
                        parent: this.parent,
                        config: this.config,
                        event: $event
                    })
                }
            }
            ,
        }
        ,

        created() {
        }
        ,


    }
</script>

<style>

</style>
