<template>

    <v-app-bar dark app
               :clipped-left="clippedLeft">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title >{{title}}
        </v-toolbar-title>

        <v-spacer></v-spacer>
           <div class="caption"> {{user.name}}</div>
    </v-app-bar>

</template>

<script>

    import { get, sync } from 'vuex-pathify'


    export default {
        props: ['title'],
        name: 'HelloWorld',
        data: () => ({}),
        computed:{
            clippedLeft: get('app/bar@clippedLeft'),
            user: get('context/user')
        }
    };
</script>


    /*.v-btn   REMEMBER TO USE SASS SYNTAX LIKE THIS...*/
        /*border: 1px solid blue*/
<style scoped lang="sass">

</style>
