<template>
    <v-container fluid style="background: mistyrose;">
        Generic configurable app
    </v-container>
</template>

<script>

    // TODO : i should pass a config object to all apps; it may contain title & other things.
    export default {
        props: ['title'],

        data: () => ({})

    };
</script>


<style lang="sass">
</style>
