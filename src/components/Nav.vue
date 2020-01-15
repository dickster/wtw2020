<template>
   <div>NAV</div>
</template>

<script>

    import { get, sync } from 'vuex-pathify'

    export default {
        props: ['title'],
        name: 'HelloWorld',
        data: () => ({}),
        computed:{
            user: get('context/user')
        }
    };
</script>

    /*.v-btn   REMEMBER TO USE SASS SYNTAX LIKE THIS...*/
        /*border: 1px solid blue*/
<style scoped lang="sass">

</style>
