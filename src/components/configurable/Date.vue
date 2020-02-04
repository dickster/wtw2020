<template>

    <div>

        <v-icon @click="show=!show">menu</v-icon>
        <template v-if="show">

            <v-date-picker
                    @change="show=false"
                    v-model="asDate"
                    no-title>
            </v-date-picker>

        </template>
        <v-text-field v-model="value"></v-text-field>

        <v-date-picker
                    @change="show=false"
                    v-model="value"
                    no-title>
            </v-date-picker>


    </div>

</template>

<script>

    import ConfigurableComponent from '../../mixins/configurableComponentMixin';

    var vm;

    export default {
        mixins : [ConfigurableComponent],
        name: "Date",
        components: {},

        data: () => ({
            show:false,
            asDate:'',
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            menu2: false,
        }),

        watch: {
            date (val) {
                this.dateFormatted = this.formatDate(this.date)
            },
        },
        computed: {

            computedDateFormatted () {
                return this.formatDate(this.date)
            },
        },

        methods: {
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },

        }
    }

</script>

<style scoped>


</style>



