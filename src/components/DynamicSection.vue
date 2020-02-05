<template>

    <div>

        <!--TODO : add ability to have v-flip.  if config.front || config.back, then -->
        <!--how to make this transition configurable? or not exist?-->

        <v-slide-y-transition>

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
