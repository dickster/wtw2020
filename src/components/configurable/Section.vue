<template>

    <v-slide-y-transition>

        <!--TODO : add optional/configurable error component here.
            will display component OR $emit invalid event.
            validations at this level should have target fields (>0) that should have their error set.
            style this component so it's hidden if not error.
        -->

        <!--add css to hide this when no errors..maybe change this to closeable alert widget??
        but make sure it lives within the form validation framework.-->
        <v-text-field :rules="rules">
        </v-text-field>

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

                        <!--[...parent,widget.bind]-->
                        <component
                                :is="componentType"
                                :parent="path"
                                :config="config"
                        >
                        </component>

                    </transition>

                </template>
            </v-row>

        </div>

    </v-slide-y-transition>

</template>

<script>
    import ConfigurableComponentMixin from '../../mixins/configurableComponentMixin'

    export default {
        props: ['config', 'bind'],
        mixins: [ConfigurableComponentMixin],

        data() {
            return {}
        },

        computed: {},

        methods: {},

        created() {

        },


    }
</script>

<style scoped>

</style>
