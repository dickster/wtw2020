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

    };
</script>


<style lang="sass">
</style>
