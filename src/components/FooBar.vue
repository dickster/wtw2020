<template>
    <v-container fluid style="background:yellowgreen;">
        FOOBAR
        <v-btn large @click="$router.push('/')">Go Back...</v-btn>
        <i class="fas fa-glasses pl-3 fa-4x"></i>
        <h1>{{title}}</h1>

    </v-container>
</template>

<script>
    export default {
        props: ['title'],
        name: 'HelloWorld',

        data: () => ({})

    };
</script>


<style lang="sass">
</style>
