<template>
    <v-container fluid style="background:blue;">
        <v-row
                text-center
                wrap
        >
            <v-col cols="12">
                <v-btn large @click="$router.push('/foo')">large button</v-btn>


            </v-col>
            <h2>{{title}}</h2>

        </v-row>
    </v-container>
</template>

<script>
    export default {
        props: ['title'],
        name: 'HelloWorld',

        data: () => ({})

    };
</script>


<style scoped lang="sass">
    .v-btn
        border: 1px solid blue

</style>
