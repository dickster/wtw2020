<template>

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

        <!--TODO : put this button at top of snackbar -->
        <v-btn
                dark
                text
                @click="snackbar = false"
        >
            x
        </v-btn>
    </v-snackbar>

</template>

<script>

    import {get, sync} from 'vuex-pathify'

    export default {
        data: () => ({
            visible: false,
        }),

        computed: {
            snackbar: sync('app/notification@snackbar')
        },

        methods: {},

        watch: {
            snackbar(newValue, oldValue) {
                this.visible = !!newValue
                if (newValue) {
                    // add to log
                    console.log('snackbar ' + newValue)
                }
            }
        }
    };
</script>

<style scoped lang="sass">

</style>
