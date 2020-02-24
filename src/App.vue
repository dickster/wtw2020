<template>
    <v-app :class="theme">

        <!-- TODO: refactor snackbar, overlay, dialog into app/components. -->

        <!--note as with overlay, once the snackbar is hidden, you will lose any information that it may have contained.
            so if you want to keep track of it (for example, you want a log of all error messages which are shown in snackbar)
            then it's up to you create your own VUEX slot.
        -->
        <v-snackbar
                v-if="snackbar"
                v-model="snackbar"
                :bottom="snackbar.bottom||true"
                :top="snackbar.top||!snackbar.bottom||false"
                :color="snackbar.color"
                :left="snackbar.left||false"
                :right="!snackbar.left"
                :multi-line="snackbar.multiline"
                :timeout="snackbar.timeout||4000"
                :vertical="snackbar.vertical"
        >
            <template v-if="snackbar.layout">
                <configurable-component-container
                        :layout="snackbar.layout"
                >
                </configurable-component-container>
            </template>
            <template v-else-if="snackbar.text">
                <p>{{snackbar.text}}</p>
            </template>

            <!--TODO : put this at top of snackbar -->
            <v-btn
                    dark
                    text
                    @click="snackbar = false"
            >
                x
            </v-btn>
        </v-snackbar>

        <!--note that once the overlay is hidden, you will lose any information that it may have contained.-->
        <v-overlay
                v-if="overlay"
                :absolute="overlay.absolute"
                :opacity="overlay.opacity"
                :value="!!overlay"
                :z-index="overlay.zIndex"
        >
            <template v-if="overlay.progress">
                <v-progress-circular v-if="overlay.progress.type=='circle'"
                                     :indeterminate="!overlay.progress.determinate"
                                     :size="overlay.progress.size||64">
                </v-progress-circular>
                <v-progress-linear v-else
                        :background-opacity="overlay.progress.opacity||.5"
                        :height="overlay.progress.height||32"
                        :indeterminate="!overlay.progress.determinate"
                        :striped="striped"
                        :value="overlay.progress.value||50"
                        :color="overlay.progress.color||'blue'"
                ></v-progress-linear>
            </template>
            <template v-if="overlay.layout">
                <configurable-component-container
                    :layout="overlay.layout"
                >
                </configurable-component-container>
            </template>
        </v-overlay>

        <v-dialog
                v-if="dialog"
                v-model="dialog"
                :persistent="dialog.persistent"
                :fullscreen="dialog.fullScreen"
                :max-width="dialog.maxWidth"
        >
            <configurable-component-container
                    :config="dialog.layout"
                    parent=""
            >
            </configurable-component-container>
        </v-dialog>

        <left-nav>
            <router-view
                    :pages="pages"
                    name="nav">
            </router-view>
        </left-nav>

        <!--TODO: convert this to ...
            <v-app-bar dark app
                       :clipped-left="clippedLeft">

                <router-view name="handler"></router-view>
                <v-progress-linear v-if="get('app/notification@progress')> </v-progress-linear>

            </v-app-bar>
        -->

        <router-view name="header"></router-view>
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

                <!--footer will be used for smaller status icons.-->

                <router-view name="drawer"></router-view>

                <v-footer fixed>
                    <v-spacer></v-spacer>
                    <span style="text-align-last: justify;">
                    hello
                    status
                    buttons
                    FOOTER
                    and
                        more...
                    </span>
                    <router-view name="footer"></router-view>
                    <!--TODO : add default icons -->
                </v-footer>
            </v-container>
        </v-content>

    </v-app>
</template>

<script>
    import {get, set, sync} from 'vuex-pathify'
    import LeftNav from './components/LeftNav'
    import ConfigurableComponentContainer from "./components/ConfigurableComponentContainer";

    export default {
        name: "App",
        components: {ConfigurableComponentContainer, LeftNav},

        computed: {
            pages: get('app/pages'),
            theme: get('app/theme'),
            overlay: sync('app/notification@overlay'),
            dialog: sync('app/notification@dialog'),
            snackbar: sync('app/notification@dialog')
        },
        data() {
            return {}
        },

        mounted() {
        },


        methods: {},

        async created() {
        }

    }
    ;
</script>

<style lang="sass" scoped>

</style>

<style>

</style>
<template>
    <v-app :class="theme">

        <!-- TODO: refactor snackbar, overlay, dialog into app/components. -->

        <!--note as with overlay, once the snackbar is hidden, you will lose any information that it may have contained.
            so if you want to keep track of it (for example, you want a log of all error messages which are shown in snackbar)
            then it's up to you create your own VUEX slot.
        -->
        <v-snackbar
                v-if="snackbar"
                v-model="snackbar"
                :bottom="snackbar.bottom||true"
                :top="snackbar.top||!snackbar.bottom||false"
                :color="snackbar.color"
                :left="snackbar.left||false"
                :right="!snackbar.left"
                :multi-line="snackbar.multiline"
                :timeout="snackbar.timeout||4000"
                :vertical="snackbar.vertical"
        >
            <template v-if="snackbar.layout">
                <configurable-component-container
                        :layout="snackbar.layout"
                >
                </configurable-component-container>
            </template>
            <template v-else-if="snackbar.text">
                <p>{{snackbar.text}}</p>
            </template>

            <!--TODO : put this at top of snackbar -->
            <v-btn
                    dark
                    text
                    @click="snackbar = false"
            >
                x
            </v-btn>
        </v-snackbar>

        <!--note that once the overlay is hidden, you will lose any information that it may have contained.-->
        <v-overlay
                v-if="overlay"
                :absolute="overlay.absolute"
                :opacity="overlay.opacity"
                :value="!!overlay"
                :z-index="overlay.zIndex"
        >
            <template v-if="overlay.progress">
                <v-progress-circular v-if="overlay.progress.type=='circle'"
                                     :indeterminate="!overlay.progress.determinate"
                                     :size="overlay.progress.size||64">
                </v-progress-circular>
                <v-progress-linear v-else
                        :background-opacity="overlay.progress.opacity||.5"
                        :height="overlay.progress.height||32"
                        :indeterminate="!overlay.progress.determinate"
                        :striped="striped"
                        :value="overlay.progress.value||50"
                        :color="overlay.progress.color||'blue'"
                ></v-progress-linear>
            </template>
            <template v-if="overlay.layout">
                <configurable-component-container
                    :layout="overlay.layout"
                >
                </configurable-component-container>
            </template>
        </v-overlay>

        <v-dialog
                v-if="dialog"
                v-model="dialog"
                :persistent="dialog.persistent"
                :fullscreen="dialog.fullScreen"
                :max-width="dialog.maxWidth"
        >
            <configurable-component-container
                    :config="dialog.layout"
                    parent=""
            >
            </configurable-component-container>
        </v-dialog>

        <left-nav>
            <router-view
                    :pages="pages"
                    name="nav">
            </router-view>
        </left-nav>

        <!--TODO: convert this to ...
            <v-app-bar dark app
                       :clipped-left="clippedLeft">

                <router-view name="handler"></router-view>
                <v-progress-linear v-if="get('app/notification@progress')> </v-progress-linear>

            </v-app-bar>
        -->

        <router-view name="header"></router-view>
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

                <!--footer will be used for smaller status icons.-->

                <router-view name="drawer"></router-view>

                <!--Should this be outside of container???-->
                <v-footer fixed>
                    <v-spacer></v-spacer>
                    <span style="text-align-last: justify;">
                    hello
                    status
                    buttons
                    FOOTER
                    and
                        more...
                    </span>
                    <router-view name="footer"></router-view>
                    <!--TODO : add default icons -->
                    <!--e.g. create appLoadingIcon widget.   and events/notifications...snackbar based. -->
                </v-footer>
            </v-container>
        </v-content>

    </v-app>
</template>

<script>
    import {get, set, sync} from 'vuex-pathify'
    import LeftNav from './components/LeftNav'
    import ConfigurableComponentContainer from "./components/ConfigurableComponentContainer";

    export default {
        name: "App",
        components: {ConfigurableComponentContainer, LeftNav},

        computed: {
            pages: get('app/pages'),
            theme: get('app/theme'),
            overlay: sync('app/notification@overlay'),
            dialog: sync('app/notification@dialog'),
            snackbar: sync('app/notification@dialog')
        },
        data() {
            return {}
        },

        mounted() {
        },


        methods: {},

        async created() {
        }

    }
    ;
</script>

<style lang="sass" scoped>

</style>

<style>

</style>
