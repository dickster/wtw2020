<template>

    <v-footer absolute>
        <!--TODO : have app level config to hide status text & eventsButton -->
        <status-text></status-text>
        <v-spacer></v-spacer>
        <slot>
            default footer...
            <!--TODO : add configurable basic buttons here.
                events/eventHistory,  progressSpinner, notifications, statusMessageText.
                they should all have basic show/hide configuration at app level at least.
            -->
        </slot>
        <events-button></events-button>
    </v-footer>

</template>

<script>

    // NOTE: don't name this "footer" because you can't have Vue components that conflict.

    import {get, sync} from 'vuex-pathify'
    import EventsButton from "./EventsButton";
    import StatusText from "./StatusText";

    export default {
        components: {StatusText, EventsButton},
        data: () => ({
            statusText: '',
            timer: null,
        }),

        computed: {
            statusBar: get('app/notification@statusBar')
        },

        methods: {},

        watch: {
            statusBar(newValue, oldValue) {
                if (newValue) {
                    if (this.timer != null) {
                        clearTimeout(this.timer)
                        this.timer = null
                    }
                    this.statusText = newValue
                }
                else {
                    // would be better if I could fade out text.
                    this.timer = setTimeout(() => this.statusText = null, 1000)
                }
            }
        }

    };
</script>

<style scoped lang="sass">

</style>
