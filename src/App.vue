<template>
    <v-app :class="theme">

        <v-content style="outline:1px solid blue;">
            <router-view name="header"></router-view>
            <v-slide-y-transition  mode="out-in">
                <router-view></router-view>
            </v-slide-y-transition>
            <router-view name="footer"></router-view>
            <router-view name="nav"></router-view>
            <router-view name="drawer"></router-view>
        </v-content>

    </v-app>
</template>

<script>
    import pathify from 'vuex-pathify'

    export default {
        name: "App",
        components: {},

        computed: {
            theme() {
                return this.$store.getters['app/theme']
            },

        },
        data() {
            return {}

        },

        mounted() {
        },


        methods: {},

        async created() {
            console.log(pathify.debug())

        }

    }
    ;
</script>

<style lang="sass" scoped>

</style>

<style>

</style>
