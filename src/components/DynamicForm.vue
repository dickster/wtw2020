<template>

    <!--should this be a form or just a container???  I dont think I need a form?/??? -->
    <div class="dynamic-form">

        <div v-if="conf">
            <template v-for="(section,i) in conf.sections">

                <!--TODO : add ability to have v-flip component for each. -->
                <!-- i.e. designate a section has front/back of flipper-->
                <!-- if so will automatically add a "flip" button at bottom -->
                <!-- which can be configured by section.config.flip {icon: '', class:'', hide:false, position:'BR'}-->
                <!-- hmmm...this should be done at the config level.  choose type=FlippableSection instead of SimpleSection-->
                <!-- or add the code to SimpleSection. -->

                <!--<configurable-section-->
                        <!--:key="i"-->
                        <!--v-if="section.beforeRows && visible(section)"-->
                        <!--:parent="section.bind?parent[section.bind]:parent"-->
                        <!--:config="section">-->
                <!--</configurable-section>-->
            </template>

            <!-- TODO : would be nice to add an aspect that could augment/change the config data -->
            <!-- for example: it could set config.disabled=TRUE to all components given a condition. -->
            <!--basically a chain of lambdas around row.widgets -->
            <v-row :wrap="!conf.noWrapRow"
                   no-gutters
                   v-for="(row,r) in conf.rows"
                   :key="r">

                <!--TODO : i should make this component automatically put columns in rows based on 12 column rule.
                i.e. user could just add widgets: (a:3, b:4, c:3, d:5) and it would lay them out
                [ a,b,c ]
                [ d ]
                does this if there if row-wrap is set.
                -->

                <template v-for="(widget,c) in row.widgets">
                    <transition :name="conf.rowTransition||'slide-y-transition'">

                        <configurable-component
                                :ref="r+c"
                                v-on:b1change="emit($event)"
                                :parent="parent"
                                :config="widget">
                        </configurable-component>

                    </transition>

                    <!--TODO : add ability to add equivalent of v-spacer.  will flex to end of row.-->
                    <!--that way you can force next widget onto new row.-->
                    <!--if config.flexBefore  <v-spacer>.-->
                    <!--if config.flexAfter...-->

                </template>
            </v-row>

            <template v-for="section in conf.sections">
                <dynamic-section
                        v-if="!section.beforeRows"
                        :parent="section.bind"
                        :config="section">
                </dynamic-section>
            </template>

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



    export default {
        mixins: [configurableComponentMixin],
        components: {ConfigurableComponent, DynamicSection},
        inject: ['evaluationService'],
        props: ['config', 'parent'],

        methods: {
            emit($event) {
                this.$emit('b1change', $event)
            },

        },
        computed: {
            conf() {
                return this.config
            },


        },
        mounted() {

        },

        created() {


        },

        data: () => ({

        }),
    }
</script>

<style>


</style>
