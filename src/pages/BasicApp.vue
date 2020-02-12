<template>
    <v-container fluid style="background: mistyrose;">
        PAGE:{{page}}  ITEM:{{item}}
    </v-container>
</template>

<script>

    import DynamicForm from "../components/DynamicForm";
    export default {
        components: {DynamicForm},
        props: ['page', 'item'],

        data: () => ({

        })


        // look at page,item, app and load config appropriately.
        // for RATER app, need drawer config?

    };
</script>


<style lang="sass">
</style>
