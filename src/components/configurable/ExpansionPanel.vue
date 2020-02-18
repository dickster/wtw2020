<template>

    <div class="expansion-panel" >

        <v-list dense dark color="primary lighten-2" shaped class="expansion-panel-nav">
            <v-list-item-group v-model="nav">
                <v-list-item
                        v-for="(section,i) in visibleSections"
                        :key="i">

                    <v-list-item-title>

                        <v-tooltip open-delay="300" color="primary" left>
                            <template v-slot:activator="{ on }">
                                <v-icon  v-on="on">{{section.icon}}</v-icon>
                            </template>
                            <span >{{section.label}}</span>
                        </v-tooltip>


                    </v-list-item-title>

                </v-list-item>
            </v-list-item-group>
        </v-list>


        <v-expansion-panels
                mandatory
                v-model="expanded">
            <v-expansion-panel
                    v-model="expanded"
                    v-for="(section,i) in visibleSections"
                    :key="i">
                <v-expansion-panel-header hide-actions>

                    <v-icon class="v-expansion-panel-header__icon">{{section.icon||'more'}}</v-icon>
                    <div class="title">{{section.label}}</div>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                    <dynamic-form
                            :config="section"
                            :parent="section.bind?parent[section.bind]:parent"></dynamic-form>
                </v-expansion-panel-content>
            </v-expansion-panel>

        </v-expansion-panels>

    </div>

</template>


<script>
    import Form from './Form'

    export default {
        name: 'simple-section',
        props: [
            'config', 'parent'
        ],
        components: {Form},

        data: () => ({

            expanded: 0,

        }),

        computed: {
            nav  : {
                get: function() {
                    return this.expanded
                },
                set: function(v) {
                    this.expanded = v
                }
            },
            visibleSections() {
                return this.config.sections.filter(s => !s.expression || this.$evaluate(s.expression))
            }
        },

        created() {
        },


        watch: {

        },

        methods: {


        }
    }
</script>

<style scoped>
    .expansion-panel {
        margin-right:64px;
    }

    .v-tooltip__content {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

        font-size: 22px;
        opacity: 1 !important;
        box-shadow: 4px 4px 5px -2px #888;

    }
    .expansion-panel-nav + .v-expansion-panels {
        margin-left: 64px;
    }

    .expansion-panel-nav {
        margin-top: 34px;
        padding-top: 5px;
        padding-bottom: 5px;
        overflow: hidden;
        margin-left: -12px;
        /*background: #82b1ff;*/
        /*height: calc(100% - 290px);*/
        width: 64px;
        position: fixed;
        display: block;
        border-top-right-radius: 32px;
        border-bottom-right-radius: 32px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;

    }




</style>

<style>

    .expansion-panel .v-expansion-panel-content__wrap {
        width:100%;
    }

</style>
