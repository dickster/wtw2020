<template>

    <v-navigation-drawer v-if="isVisible()"
                         class="left-nav"
                         fixed
                         v-model="drawer.visible"
                         :clipped="drawer.clipped"
                         :width="drawer.width"
                         color=""
                         :mini-variant="drawer.mini"
                         app
                         hide-overlay
                         :mini-variant-width="drawer.miniWidth"
    >


        <!--TODO : handle events, close, mini, max, open -->
        <slot @close="visible=false"
              @mini="mini=true"
              @resize="navResize"
        ></slot>
    </v-navigation-drawer>
</template>

<script>

    import {get, sync} from 'vuex-pathify'

    export default {
        data: () => ({}),

        computed: {
            drawer: sync('app/drawer'),
            mini: sync('app/drawer@mini'),
            visible: sync('app/drawer@visible'),
            // TODO : need to add maximize functionality...
        },

        methods: {
            isVisible() {
                return this.$slots.default
            }
        },

    };
</script>

<style scoped lang="sass">

</style>
