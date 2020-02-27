<template>
    <v-app :class="theme">

        <overlay></overlay>
        <event-snack-bar></event-snack-bar>
        <dialog></dialog>
        <bottom-sheet></bottom-sheet>

        <left-nav>
            <router-view
                    :pages="pages"
                    name="nav">
            </router-view>
        </left-nav>

        <app-header>
            <router-view name="header"></router-view>
        </app-header>

        <v-content dark>
            <v-container
                    class="fill-height pa-0"
                    fluid
            >
                <v-slide-y-transition mode="out-in">
                    <router-view :key="$route.fullPath"
                                 name="default">
                    </router-view>
                    <!--TODO : embed (another) footer inside  main view.  that's where action buttons will live. -->
                </v-slide-y-transition>
                <router-view name="drawer"></router-view>
            </v-container>
            <app-footer>
                <router-view name="footer"></router-view>
            </app-footer>

        </v-content>

    </v-app>
</template>

<script>
    import {get, set, sync} from 'vuex-pathify'
    import LeftNav from './LeftNav'
    import ConfigurableComponentContainer from "../components/ConfigurableComponentContainer"
    import Overlay from "./Overlay"
    import Dialog from './Dialog'
    import AppFooter from './AppFooter'
    import EventSnackBar from "./EventSnackBar"
    import BottomSheet from "./BottomSheet"
    import AppHeader from './AppHeader'


    export default {
        name: "App",
        components: {
            AppHeader,
            BottomSheet,
            EventSnackBar,
            Overlay,
            ConfigurableComponentContainer,
            LeftNav,
            Dialog,
            AppFooter
        },

        computed: {
            pages: get('app/pages'),
            theme: get('app/theme'),
            overlay: sync('app/notification@overlay'),
            dialog: sync('app/notification@dialog'),
            snackbar: sync('app/notification@event')
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







