<template>
    <v-app :class="theme">




        <left-nav>
            <router-view name="nav"></router-view>
        </left-nav>

        <router-view name="header"></router-view>
        <v-content dark style="outline:1px solid blue;">

            <v-container
                    class="fill-height pa-0"
                    fluid
            >
            <v-slide-y-transition mode="out-in">
                <router-view></router-view>
            </v-slide-y-transition>

            <router-view name="footer"></router-view>
            <router-view name="drawer"></router-view>

            </v-container>
        </v-content>

    </v-app>
</template>

<script>
    import pathify from 'vuex-pathify'
    import {get, set} from 'vuex-pathify'
    import LeftNav from './components/LeftNav'

    export default {
        name: "App",
        components: {LeftNav},

        computed: {

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
