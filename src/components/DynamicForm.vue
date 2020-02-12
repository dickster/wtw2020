<template>

    <!--should this be a form or just a container???  I dont think I need a form?/??? -->
    <div class="dynamic-form">


        {{JSON.stringify(stuff)}}
        <div v-if="config">

            <!--<template v-for="(section,i) in sections">-->

            <!--&lt;!&ndash;TODO : add ability to have v-flip component for each. &ndash;&gt;-->
            <!--&lt;!&ndash; i.e. designate a section has front/back of flipper&ndash;&gt;-->
            <!--&lt;!&ndash; if so will automatically add a "flip" button at bottom &ndash;&gt;-->
            <!--&lt;!&ndash; which can be configured by section.config.flip {icon: '', class:'', hide:false, position:'BR'}&ndash;&gt;-->
            <!--&lt;!&ndash; hmmm...this should be done at the config level.  choose type=FlippableSection instead of SimpleSection&ndash;&gt;-->
            <!--&lt;!&ndash; or add the code to SimpleSection. &ndash;&gt;-->

            <!--&lt;!&ndash;<configurable-section&ndash;&gt;-->
            <!--&lt;!&ndash;:key="i"&ndash;&gt;-->
            <!--&lt;!&ndash;v-if="section.beforeRows && visible(section)"&ndash;&gt;-->
            <!--&lt;!&ndash;:parent="section.bind?parent[section.bind]:parent"&ndash;&gt;-->
            <!--&lt;!&ndash;:config="section">&ndash;&gt;-->
            <!--&lt;!&ndash;</configurable-section>&ndash;&gt;-->
            <!--</template>-->

            <!-- TODO : would be nice to add an aspect that could augment/change the config data -->
            <!-- for example: it could set config.disabled=TRUE to all components given a condition. -->
            <!--basically a chain of lambdas around row.widgets -->

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
                        <configurable-component
                                @input="handleInput($event, widget)"
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

            <!--<template v-for="section in sections">-->
            <!--<dynamic-section-->
            <!--v-if="!section.beforeRows"-->
            <!--:parent="section.bind"-->
            <!--:config="section">-->
            <!--</dynamic-section>-->
            <!--</template>-->

        </div>

        <template v-else>
            (no configuration given for questions) {{parent}}
        </template>
    </div>


</template>


<script>

    import DynamicSection from './DynamicSection'
    import ConfigurableComponent from "./ConfigurableComponent"
    import configurableComponentMixin from '../mixins/configurableComponentMixin'
    import {get, set} from 'vuex-pathify'


    export default {
        mixins: [configurableComponentMixin],
        components: {ConfigurableComponent, DynamicSection},
        inject: ['evaluationService'],
        props: ['config', 'parent'],

        methods: {
            handleInput(value, widget) {
                console.log(JSON.stringify(value))
                this.$store.set('data/root@' + widget.bind, value)
            },

            emit($event) {
                this.$emit('b1change', $event)
            },

        }
        ,
        computed: {
            stuff: get('data/root')
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
