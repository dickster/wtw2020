<template>

    <!--should this be a form or just a container???  I dont think I need a form?/??? -->
    <div class="dynamic-form">

        <!--Todo: change this to a simple form component that contains ConfigurableComponents
        collection. this is because SEctions and other components will need that functionality without having the form.

        -->

        {{JSON.stringify(stuff)}}
        <div v-if="config">

            <!-- TODO : would be nice to add an aspect that could augment/change the config data -->
            <!-- for example: it could set config.disabled=TRUE to all components given a condition. -->
            <!--basically a chain of lambdas around row.widgets -->
            <!--another use case is to add $listeners or $attrs.
                (this would require i add on=$listeners to conf component

                @see https://github.com/vuejs/vue/releases/tag/v2.4.0

                all wrapping components should use...
                use inheritAttrs:false,
                <div class="wrapper">
                    <input v-bind="$attrs" v-on="$listeners">
                </div>
                if configurableCOmponent instance is unwrapped...
                <template>
                    <v-textarea></>
                   </template>
                   then the attrs &
            -->

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
                                v-bind="propsAndAttributes"
                                :value="valueFor(widget)"
                                :ref="c.ref"
                                :config="widget">

                        </configurable-component>

                    </transition>

                    <!--TODO : add ability to add equivalent of v-spacer.  will flex to end of row.-->
                    <!--that way you can force next widget onto new row.-->
                    <!--if config.flexBefore  <v-spacer>.-->
                    <!--if config.flexAfter...-->

                </template>
            </v-row>

        </div>

        <template v-else>
            (no configuration given for questions) {{parent}}
        </template>
    </div>


</template>


<script>

    // TODO: don't have sections in config.
    // just have TYPE=SECTION which has its own child config??
    //  for flipSection it has subsections = back/front.

    import DynamicSection from './DynamicSection'
    import ConfigurableComponent from './ConfigurableComponent'
    import {get, set} from 'vuex-pathify'
    import configurableComponentContainerMixin from '../mixins/configurableComponentContainerMixin'


    export default {
        mixins: [configurableComponentContainerMixin],
        components: {ConfigurableComponent, DynamicSection},
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
                let path = [this.parent || [], $event.parent || [], $event.widget.bind].flat()
                console.log('setting ' + path)
                this.$store.set('data/root@' + path.join('.'), $event.value)
            },


        }
        ,
        computed: {
            stuff: get('data/root'),
            listeners() {
                return {
                    ...this.config.listeners,
                    'wtw-input': this.handleInput,
                }
            },

            propsAndAttributes() {
                //TODO : should lint the attributes and make sure they are valid HTML.
                // actually, this should be done in the editor.
                // should be either a valid HTML attribute or prefixed with "data-".

                // will return config.attrs in future.
                // allow for customization to add attrs @ runtime.
                // e.g. return fn(config.attrs) => {...myAttrs, config.attrs}
                return {
                    title: 'foobar',
                    myInvalidAttr: 'hello'
                }
            }
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
