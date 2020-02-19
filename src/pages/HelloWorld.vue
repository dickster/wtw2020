<template>
    <v-container fill-height fluid style="">
        <v-row text-center wrap>
            <v-col cols="12">
                <v-btn large @click="$router.push('/foo')">Go to FOO</v-btn>
            </v-col>
            <h2>{{title}}</h2>

            <page
                    :config="config"
            >
            </page>
        </v-row>
    </v-container>
</template>


<script>
    import Page from "../components/configurable/Page"

    export default {
        components: {Page},
        props: ['title'],
        inject: ['policyRepository'],
        name: 'HelloWorld',

        data: () => ({
            config:
                {
                    validations:[],
                    rows: [
                        {
                            widgets: [
                                {
                                    type: "TextField",
                                    bind: "empty",
                                    label: "Foo",
                                    labelWidth:4,
                                    visible:"$.bar>5",
                                    validation: {expr:"it>3 && $.bar>10",mode:"server", msg:"value must be > 3 and bar > 10", code:-1},
                                    width: 12
                                },
                                {
                                    type: "TextField",
                                    bind: "blargh",
                                    label: "Blarg",
                                    labelWidth:4,
                                    validation: "!!it",
                                    width: 12
                                },
                                {
                                    type: "TextField",
                                    bind: "bar",
                                    label: "Bar",
                                    validation: "$.max(it, $.blargh)<10",
                                    labelWidth:4,
                                    width: 12
                                }
                            ]
                        }
                    ]
                }
        }),

        async created() {
            //this.policyRepository.list()
        }

    };
</script>


<style scoped lang="sass">

</style>
