<template>

    <v-bottom-sheet v-model="bottomSheet"
                    inset
                    hide-overlay>
        <v-card>
            <v-card-title>
                this is a bottom sheet
                add configurable component here...
            </v-card-title>
            <v-card-actions>
                <v-btn icon small @click="bottomSheet=false">x</v-btn>
            </v-card-actions>

        </v-card>
    </v-bottom-sheet>

</template>

<script>

    import {sync} from 'vuex-pathify'

    export default {
        data: () => ({
        }),

        computed: {
            bottomSheet: sync('app/notification@bottomSheet')
        },

        methods: {},

    };
</script>

<style scoped lang="sass">

</style>
