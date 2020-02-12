<template>

    <div>

        <!--TODO : add ability to have v-flip.  if config.front || config.back, then -->
        <!--how to make this transition configurable? or not exist?-->

        <v-slide-y-transition>

            <!--TODO : add optional/configurable error component here.
                will display component OR $emit invalid event.
                validations at this level should have target fields (>0) that should have their error set.
                style this component so it's hidden if not error.
            -->

            <v-text-field label="errors" :rules="sectionRules">
            </v-text-field>

            <!--sections take items or item? or just bind?-->
            <component
                    v-bind:is="componentType"
                    :config="config"
                    :parent="parent"
                    v-show="visible">
            </component>

        </v-slide-y-transition>
    </div>
</template>


<script>
    export default {
        props: ['config','parent'],
        data() {
            return {}
        },

        computed: {
            componentType() {
                let type=this.config.type
                return () => import(`./configurable/${type}.vue`);
            },
            sectionRules() {
                // TODO : hook up to sections rules.
                return [v=>true]
            }
        },

        methods: {

        },

        created() {

        },


    }
</script>

<style scoped>

</style>
