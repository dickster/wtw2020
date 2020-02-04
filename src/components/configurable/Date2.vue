<template>

    <div>
        <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="true"
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                        v-model="dateFormatted"
                        label="Date"
                        hint="MM/DD/YYYY format"
                        persistent-hint
                        prepend-icon="event"
                        @blur="date = parseDate(dateFormatted)"
                        v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
    </div>

</template>

<script>

    import ConfigurableComponent from '../../mixins/configurableComponentMixin';


    var vm;

    export default {
        mixins : [ConfigurableComponent],
        name: "DatePicker",
        components: {},

        data: () => ({
            date: null,
            dateFormatted: null,
            menu1: false,
            menu2: false,
        }),

        watch: {
            date (val) {
                this.dateFormatted = vm.formatDate(this.date)
            },
        },
        mounted() {
            vm = this
        },

        computed: {
            computedDateFormatted () {
                return vm.formatDate(this.date)
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



