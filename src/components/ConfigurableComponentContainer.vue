<template>

    <transition-group  name="transition||'slide-y-transition'" tag="ul">

            <v-row wrap
                   no-gutters
                   v-for="(row,r) in layout"
                   :key="r">

                <!--TODO : i should make this component automatically put columns in rows based on 12 column rule.
                i.e. user could just add widgets: (a:3, b:4, c:3, d:5) and it would lay them out
                [ a,b,c ]
                [ d ]
                does this if there if row-wrap is set.
                -->

                <template v-for="(widget,c) in row">

                    <transition :name="transition||'slide-x-transition'">

                        <configurable-component
                                :parent="parent"
                                :config="widget"
                        >
                        </configurable-component>

                    </transition>

                </template>
            </v-row>

        </transition-group>

</template>


<script>

    import ConfigurableComponent from './ConfigurableComponent'
    import configurableComponentContainerMixin from '../mixins/configurableComponentContainerMixin'

    export default {
        components: {ConfigurableComponent},
        // TODO : add other layout props here like 'transition'...don't put them in layout array.
        // for example, if you wanted a 10 column layout, add a new prop 'cols10'.
        props: ['parent', 'layout', 'transition'],

        methods: {}
        ,
        computed: {}
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
