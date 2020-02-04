<template>

        <v-navigation-drawer v-if="visible()"
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

            <p style="word-wrap:break-word;">{{JSON.stringify($store.get('data',null,2))}}</p>
            <!--TODO : handle events, close, mini, max, open -->
            <template slot-scope="scope">
                <slot :close="close" :max="max"></slot>
            </template>
        </v-navigation-drawer>

</template>

<script>

    import {get, sync} from 'vuex-pathify'

    export default {
        data: () => ({}),

        computed: {
            drawer: sync('app/drawer'),
        },

        methods:{
            visible() {
                return this.$slots.default
            }
        },

        created() {
        }
    };
</script>

<style scoped lang="sass">

</style>
