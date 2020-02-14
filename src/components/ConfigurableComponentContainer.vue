<template>

    <div>
        <v-row :wrap="!config.noWrapRow"
               no-gutters
               v-for="(row,r) in config.rows"
               :key="r">

            <!--TODO : i should make this component automatically put columns in rows based on 12 column rule.
            i.e. user could just add widgets: (a:3, b:4, c:3, d:5) and it would lay them out
            [ a,b,c ]
            [ d ]
            does this if there if row-wrap is set.
            -->

            <template v-for="(widget,c) in row.widgets">
                <transition :name="config.rowTransition||'slide-y-transition'">

                    <!--TODO : make all widgets emit input event. this is captured by parent form.-->
                    <!--instead of having them tightly bound to VUEX. -->
                    <!--need to pass value and listen for events -->
                    <!--config.path.push(parent) -->
                    <!--how to deal with array index?? -->

                    <!--instead of :parent="item" in tabs, need to set parent to parent+'[index]'-->

                    <configurable-component
                            v-on="listeners"
                            v-bind="config.attrs"
                            :value="valueFor(widget)"
                            :ref="c.ref"
                            :config="widget">
                    </configurable-component>

                </transition>

            </template>
        </v-row>

    </div>
</template>


<script>


    import ConfigurableComponent from './ConfigurableComponent'
    import configurableComponentContainerMixin from '../mixins/configurableComponentContainerMixin'


    export default {
        mixins: [configurableComponentContainerMixin],
        components: {ConfigurableComponent},
        inject: ['evaluationService'],  //accessorService
        props: ['config', 'parent'],

        methods: {

            // TODO : maybe inject accessor. can be VUE based or whatever else...
            // accessor does value, handleInput, emit.  that way this component is not tied to VUEX.

            valueFor(widget) {
                this.$store.get('data/root@' + widget.bind)
            },
            // ToDO : handle parent path - ['policy', 'locations', '[0]')
            // path.join('.').replace('.[','[')

            handleInput($event) {
                let path = [this.parent || [], $event.path || []].flat()
                console.log('setting ' + path)
                this.$store.set('data/root@' + path.join('.'), $event.value)
            },


        }
        ,
        computed: {
            listeners() {
                return {
                    ...this.config.listeners,
                    'wtw-input': this.emitInput,
                }
            },

        }
        ,

        mounted() {

        }
        ,

        created() {


        }
        ,

        data: () => ({}),
    }
</script>

<style>


</style>
