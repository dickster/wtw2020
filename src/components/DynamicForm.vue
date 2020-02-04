<template>

    <v-form class="dynamic-form">

        <div v-if="conf">
            <template v-for="(section,i) in conf.sections">

                <!--TODO :  add ability to have v-flip component for each. -->
                <!-- i.e. designate a section has front/back of flipper-->
                <!-- if so will automatically add a "flip" button at bottom -->
                <!-- which can be configured by section.config.flip {icon: '', class:'', hide:false, position:'BR'}-->

                <!--<configurable-section-->
                        <!--:key="i"-->
                        <!--v-if="section.beforeRows && visible(section)"-->
                        <!--:parent="section.bind?parent[section.bind]:parent"-->
                        <!--:config="section">-->
                <!--</configurable-section>-->
            </template>

            <v-row :wrap="!config.noWrapRow"
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
                    <transition :name="config.rowTransition||'slide-y-transition'">

                        <configurable-component
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
                <configurable-section
                        v-if="!section.beforeRows && vis(section)"
                        :parent="section.bind"
                        :config="section">
                </configurable-section>
            </template>

        </div>

        <template v-else>
            (no configuration given for questions)
        </template>
    </v-form>


</template>


<script>

    import DynamicSection from './DynamicSection'
    import ConfigurableComponent from "./ConfigurableComponent"
    import configurableComponentMixin from '../mixins/configurableComponentMixin'



    export default {
        mixins: [configurableComponentMixin],
        components: {ConfigurableComponent, DynamicSection},
        props: ['config', 'parent'],

        methods: {
            // TODO : refactor this into configurableComponentMixin.
            vis(config) {
                //TODO : refactor this into generic service/plugin
                // $expressionEvaluator.withContext({}).bind(this).eval(expr)
                // allow custom context objects.
                if (!config.expression) return true;
                let fn = new Function('value', 'policy', '$', 'return ' + config.expression);
                let context = {
                    value: this.value,
                    config: config,
                    parent: this.parent,
                    it: this.value
                };
                let result = fn(this.value, this.$policy, context);
                return result
            },
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
