<template>

    <span>

            <v-select
                    :label="config.label"
                    :async-loading="loading"
                    cache-items
                    :item-text = "config.itemText"
                    :item-value = "config.itemValue"
                    :loading="loading"
                    :required="config.required"
                    :items="items"
                    :search-input.sync="search"
                    v-model="value"
            ></v-select>
        <!--:rules="[() => select.length > 0 || 'You must choose at least one']"-->
    </span>

</template>

<script>


    import ConfigurableComponent from '../../mixins/configurableComponentMixin';
    import axios from 'axios'

    export default {
        mixins : [ConfigurableComponent],
        name: "Autocomplete",
        components: {},

        data: () => ({
            search:'',
            loading: false,
            items: []
        }),

        computed: {


        },

        created() {
            // TODO : assert  this.config.items == AXIOS options...
            let initialValue = this.value
            this.loading = true
            let that = this
            let params = this.transform(this.config.items.params)
            // TODO : need to cache these in items service. (or should I just let browser do it?)
            axios.get(
                this.config.items.url,
                { params: params }
            )
                .then(response => {
                    // TODO : add transformation...
                    this.items = response.data
                    this.value = initialValue
                    this.loading = false
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    this.loading = false
                });

        },

        watch: {
            search (val) {
                val && this.querySelections(val)
            }
        },

        methods: {
            querySelections (v) {
                this.items = this.states.filter(e => {
                    return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
                })

            }


        }
    }
</script>

<style scoped>


</style>
