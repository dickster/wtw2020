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
                                 color="primary lighten-2"
                                 :mini-variant="drawer.mini"
                                 app
                                 hide-overlay
                                 :mini-variant-width="drawer.miniWidth"
            >

                <!--// TODO : pass any relevant state props to view. instead of coupling them to state.-->
                <!--// i.e. pass get('app/drawer') as 'layout' prop-->

                <router-view name="nav"></router-view>

            </v-navigation-drawer>
            <router-view name="footer"></router-view>
            <router-view name="drawer"></router-view>
        </v-content>

    </v-app>
</template>

<script>
    import pathify from 'vuex-pathify'
    import {get,set} from 'vuex-pathify'

    export default {
        name: "App",
        components: {},

        computed: {

            drawer: get('app/drawer'),

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
        }

    }
    ;
</script>

<style lang="sass" scoped>

</style>

<style>

</style>
