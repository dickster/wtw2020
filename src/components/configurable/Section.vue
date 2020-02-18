<template>


        <!--TODO : add optional/configurable error component here.
            will display component OR $emit invalid event.
            validations at this level should have target fields (>0) that should have their error set.
            style this component so it's hidden if not error.
        -->

        <div>
            <!--add css to hide this when no errors..maybe change this to closeable alert widget??
            but make sure it lives within the form validation framework.-->
            <v-text-field label="valid" :rules="rules">
            </v-text-field>



            <v-row no-gutters
                   v-for="(row,r) in config.rows"
                   :key="r">

                <!--TODO : i should make this component automatically put columns in rows based on 12 column rule.
                i.e. user could just add widgets: (a:3, b:4, c:3, d:5) and it would lay them out
                [ a,b,c ]
                [ d ]
                does this if there if row-wrap is set.
                -->

                <template v-for="(widget,c) in row">

                        parent path:{{path}}
                    <transition :name="config.rowTransition||'slide-y-transition'">


                        <configurable-component
                                :parent="path"
                                :config="widget"
                        >
                        </configurable-component>

                    </transition>

                </template>
            </v-row>

        </div>


</template>

<script>
    import ConfigurableComponentMixin from '../../mixins/configurableComponentMixin'
    import ConfigurableComponent from "../ConfigurableComponent";

    export default {
        components: {ConfigurableComponent},
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
