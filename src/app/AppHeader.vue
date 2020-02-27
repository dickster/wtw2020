<template>

    <v-app-bar dark app
               :clipped-left="clippedLeft">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title >{{title}}</v-toolbar-title>

        <slot></slot>

        <v-progress-linear v-if="progress"
                           bottom absolute
                           :background-opacity="progress.opacity||.5"
                           :height="progress.height"
                           :indeterminate="!progress.determinate"
                           :value="progress.value"
                           :color="progress.color||'blue'"
        ></v-progress-linear>

    </v-app-bar>

</template>

<script>

    import { get, sync } from 'vuex-pathify'


    export default {
        data: () => ({

        }),
        computed:{
            progress: get('app/notification@progress'),
            title: get('app/title'),
            clippedLeft: get('app/bar@clippedLeft'),
        }
    };
</script>


    /*.v-btn   REMEMBER TO USE SASS SYNTAX LIKE THIS...*/
        /*border: 1px solid blue*/
<style scoped lang="sass">

</style>
