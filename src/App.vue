<template>
    <v-app :class="theme">

        <v-content style="outline:1px solid blue;">
            <router-view name="header"></router-view>
            <v-slide-y-transition mode="out-in">
                <router-view></router-view>
            </v-slide-y-transition>

            <v-navigation-drawer class="navigation-drawer-left elevation-5"
                                 fixed
                                 :value="hasDrawer() && drawer.visible"
                                 :width="drawer.width"
                                 color="primary lighten-2  "
                                 :mini-variant="drawer.mini"
                                 app
                                 hide-overlay
                                 :mini-variant-width="drawer.miniWidth"
            >

                <router-view name="nav"></router-view>

            </v-navigation-drawer>
            <router-view name="footer"></router-view>
            <router-view name="drawer"></router-view>
        </v-content>

    </v-app>
</template>

<script>
    import pathify from 'vuex-pathify'

    export default {
        name: "App",
        components: {},




        computed: {

            drawer() {

                return {
                    miniWidth: 90,
                    mini: false,
                    visible: true,
                    width: 300
                }
            },
            theme() {
                return this.$store.getters['app/theme']
            },

        },
        data() {
            return {}

        },

        mounted() {
        },


        methods: {
            hasDrawer() {
                return !!this.$router.currentRoute.matched[0].components.nav
            },
        },

        async created() {
            console.log(pathify.debug())

        }

    }
    ;
</script>

<style lang="sass" scoped>

</style>

<style>

</style>
