<template>

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

</template>

<script>

    import {get, sync} from 'vuex-pathify'

    export default {
        data: () => ({}),

        computed: {
            dialog: sync('app/notification@dialog')
        },

        methods: {
        },

    };
</script>

<style scoped lang="sass">

</style>
