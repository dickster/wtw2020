<template>
    <div>
            <v-data-table
                    :headers="config.headers"
                    :items="config.items"
                    class="elevation-1"
            >


                <template v-slot:items="props">
                    <td>{{ props.item.name }}</td>
                    <!--make a scoped slot? or use JSONata to transform-->
<!--    iterate over column config....-->
                    <!--column(index,props.item)-->
                    <td class="text-xs-right">{{ props.item.calories }}</td>
                    <td class="text-xs-right">{{ props.item.fat }}</td>
                    <td class="text-xs-right">{{ props.item.carbs }}</td>
                    <td class="text-xs-right">{{ props.item.protein }}</td>
                    <td class="text-xs-right">{{ props.item.iron }}</td>
                </template>
            </v-data-table>
            </div>

</template>

<script>

    import ConfigurableComponent from '../../mixins/configurableComponentMixin';


    export default {
        mixins : [ConfigurableComponent],
        name: "Table",
        components: {},

        data: () => ({
            context: {
                item: 'the current item',
                index: '0..n',
                colCount: '0...n',
                rowCount: '0..n',
            },
            config: {

            }

        }),

        computed: {

        },

        methods: {


        }
    }
</script>

<style scoped>


</style>
