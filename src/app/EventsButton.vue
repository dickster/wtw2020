<template>

    <v-btn  @click="bottomSheet='events'" icon small>
        <i class="fas fa-glasses"></i>
    </v-btn>

</template>

<script>

    import {sync} from 'vuex-pathify'

    export default {
        data: () => ({}),

        computed: {
            bottomSheet: sync('app/notification@bottomSheet')
        },

        methods: {},

    };
</script>

<style scoped lang="sass">

</style>


