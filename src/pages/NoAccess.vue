<template>

    <v-container fluid dark>
        <v-row align="center">
            <v-col cols="4" offset="4">
                <v-card-text v-if="target"
                             class="text-center mt-5  display-1">
                    <div><i class="fas fa-car-crash fa-7x"></i></div>
                    <div>The path '{{target.name}}' is not available.</div>
                </v-card-text>
                <v-card-text v-else
                             class="text-center mt-5  display-1">
                    <div><i class="fas fa-car-crash fa-7x"></i></div>
                    <div>Oops. Sorry, that page is not available.</div>
                </v-card-text>
                <v-card-text class="headline text-center ">
                    <template v-if="reason">
                        {{reason}}
                    </template>
                    <span class="" v-if="target">[{{target.path}}]</span>
                    <br>
                    <v-btn v-if="back && back.name"
                           text
                           class="title mt-5"
                           @click="$router.push({name:back.name})"
                    >
                        <i class="far fa-hand-point-left"></i>
                        Back to {{back.name}}
                    </v-btn>
                    <v-btn v-else
                           text
                           class="title mt-5"
                           @click="$router.push({name:home})"
                    >
                       <i class="far fa-hand-point-left"></i>
                        Back to home
                    </v-btn>
                </v-card-text>

            </v-col>


        </v-row>
    </v-container>
</template>

<script>

    import Vue from 'vue'

    export default {
        props: {
            home: {
                type: String,
                default: 'helloworld'
            },
            target: {
                type: Object,
            },
            reason: {
                type: String,
            },
            back: {
                type: Object,
            }
        },
        components: {},

        computed: {

        }
        ,
        data() {
            return {
                show1: false,
                user: '',
                password: 'Password',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                },
            }

        }
        ,

        watch: {}
        ,

        mounted() {
        }
        ,


        methods: {}
        ,

        async created() {
        }

    }
</script>

<style scoped>


</style>

<style>
</style>
