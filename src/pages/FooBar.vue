<template>
    <div style="background:yellowgreen;height:100%;width:100%;">
        FOOBAR
        <v-btn large @click="$router.push('/')">Go Back...</v-btn>
        <v-btn large @click="$router.push('/secret')">Go to secret page</v-btn>
        <i class="fas fa-glasses pl-3 fa-4x"></i>
        <h1>{{title}}</h1>
    </div>
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
