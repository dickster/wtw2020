<template>

    <v-col  v-if="visible"
            style=""
            :cols="config.width"
            :offset="config.offset"
            >

        <!--how will non-config components handle validation??? -->
        <!-- they have to do it by -->
        <!-- this should propogate @input events up to parent. -->
        <!-- as well as validation events. -->
        <!-- specify which events you want to listen to
            v-on=config.events   => transform all values so callback is ()-=>$emit(eventName, {payload})-->

        <!-- TODO : pass event listeners & attributes here. -->
        <!-- each component is responsible for passing them through to proper component. -->
        <!-- i.e. TextField passes attributes/listeners on to the <input type="text"> element -->

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
