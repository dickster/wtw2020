<template>
    <v-app :class="theme">

        <left-nav>
            <router-view
                    @page-transition="transition($event)"
                    :pages="pages"
                    name="nav">
            </router-view>
        </left-nav>

        <router-view name="header"></router-view>
        <v-content dark style="outline:1px solid blue;">

            <v-container
                    class="fill-height pa-0"
                    fluid
            >
            <v-slide-y-transition mode="out-in">
                <router-view
                        name="default"
                        @page-transition="transition($event)">
                </router-view>
                <!--TODO : embed (another) footer inside  main view.  that's where action buttons will live. -->
            </v-slide-y-transition>

                <!--footer will be used for smaller status icons.-->

            <router-view name="footer" @page-transition="transition($event)"></router-view>
            <router-view name="drawer" @page-transition="transition($event)"></router-view>

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
            pages: get('app/pages'),
            theme:get('app/theme')
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
