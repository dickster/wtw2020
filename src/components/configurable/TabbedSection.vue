<template>
    <div class="tabbed-section">

        <v-tabs
                class=""
                v-model="currentItem"
        >
            <v-tab
                    v-for="(item,index) in items"
                    :key="index"
            >
                {{index}}
            </v-tab>

        </v-tabs>

        <v-tabs-items v-model="currentItem">
            <v-tab-item
                    v-for="(item,index) in items"
                    :key="index"
            >
                <configurable-component-container
                        :ref="'item'+index"
                        :parent="itemPath"
                        :layout="config.layout">
                </configurable-component-container>

            </v-tab-item>

        </v-tabs-items>
    </div>
</template>


<script>
    import Vue from 'vue'
    import configurableComponentMixin from '../../mixins/configurableComponentMixin'
    import ConfigurableComponentContainer from '../../components/ConfigurableComponentContainer'

    export default {
        components: {ConfigurableComponentContainer},
        mixins: [configurableComponentMixin],


        data: () => ({
            currentItem:0
        }),

        computed: {
            items() {
                return this.value
            },
            itemPath() {
                return this.path.concat(this.currentItem)
            }
        },
        created() {
        },

        methods: {

        }
    }
</script>

<style>

</style>

<style scoped>


</style>
