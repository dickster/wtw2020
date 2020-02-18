<template>

    <div>

        <v-textarea :value="JSON.stringify(allData)"></v-textarea>
        <v-textarea :value="JSON.stringify(validation)"></v-textarea>

        <v-toolbar>
            <!--make this a toolbar.-->

            <v-icon large
                    class="secondary white--text"
                    @click="$router.push('/')">
                home
            </v-icon>

            <v-btn
                    icon
                    text
                    small
                    @click="$emit('toggle_mini')"
                    class="nav-top-action">
                <v-icon>{{!mini?'keyboard_arrow_left':'keyboard_arrow_right'}}</v-icon>
            </v-btn>
        </v-toolbar>

        <div class="list-container">

            <div class="progress-list">

                <!--TODO : need to have some sort of validation per page.
                    stepper will show error if page has errors. maybe have a watch on form::valid and emit it?
                    OR bind form::valid to known vuex.     validation.{pageName}-->

                <v-list
                        dark
                        active-class="active"
                        shaped
                        dense
                        :two-line="twoLine"
                        :one-line="oneLine">
                    <v-list-item v-for="(page,i) in pages"
                                 :key="page.name"
                                 :class="pageCss(i)"
                                 @click="$emit('transition', {to: page})">
                        <div v-if="i<pages.length-1" class="progress-line"></div>

                        <v-list-item-avatar>
                            <v-tooltip
                                    color="primary  lighten-3"
                                    :open-delay="mini?1:1000000000"
                                    right>
                                <template v-slot:activator="{ on }">
                                    <v-avatar
                                            class="mt-0"
                                            v-on="on"
                                            color="accent"
                                            :size="iconSize(page,i)">
                                        <template v-if="page.icon">
                                            <v-icon small color="white">{{page.icon}}</v-icon>
                                        </template>
                                        <template v-else>
                                            <span class="black--text">{{page.shortForm}}</span>
                                        </template>
                                    </v-avatar>
                                </template>
                                <span>{{pageLabel(page)}}</span>
                            </v-tooltip>
                        </v-list-item-avatar>

                        <v-list-item-content class="ml-2">
                            <template v-if="!mini">
                                <v-list-item-title class="main">{{pageLabel(page)}}</v-list-item-title>
                                <v-list-item-subtitle class="summary">
                                    TODO : Summary
                                    <!--TODO : use a named portal here to house the portal.-->
                                </v-list-item-subtitle>
                            </template>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

            </div>

        </div>

    </div>

</template>

<script>

    import {get} from 'vuex-pathify'

    export default {
        name: "stepper",
        props: ['pages'],
        components: {},

        data: () => ({
            drawer: true,
        }),

        created() {

        },

        computed: {
            validation: get('app/validation'),
            allData : get('data/root'),
            oneLine() {
                return this.pages.length > 5
            },
            twoLine() {
                return !this.oneLine
            },
            mini: {
                get() {
                    return false
                },
                set() {

                }
            },
        },

        methods: {
            pageLabel(page) {
                return page.label || page.id
            },
            iconSize(page, i) {
                if (this.mini) {
                    return this.oneLine ?
                        (i == this.index ? 55 : 32) :
                        i == this.index ? 60 : 38
                }
                return i == this.index ? 45 : 30
            },
            toggleMini() {
                // TODO : hook up to pathify/Vuex.
                // this.$store.commit('miniStepper', !this.mini)
            },

            pageCss(index) {
                if (index == this.index) {
                    return 'current v-list-item--active'
                }
                else if (index < this.index) {
                    return 'completed'
                }
                else {
                    return 'incomplete'
                }
            },

        }


    }
</script>


<style>

</style>

<style scoped>

    .nav-top-action {
        position: absolute;
        right: 0;
        top: 20px;
    }

    aside.navigation-drawer-left .progress-list {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    nav.navigation-drawer-left {
        /*background: url('../assets/wtwbkg.jpg');*/
        /*background: #ccd7f8;*/
        padding-bottom: 0;
        /*opacity: .9;*/
        filter: saturate(.7);
    }

    /*MINI*/

    .navigation-drawer-left.v-navigation-drawer--mini-variant .v-list-item > *:not(:first-child) {
        display: flex;
    }

    .navigation-drawer-left.v-navigation-drawer--mini-variant .current .v-avatar > span {
        font-size: 22px !important;
    }

    .navigation-drawer-left.v-navigation-drawer--mini-variant .current .v-avatar > i {
        font-size: 35px !important;
    }

    .navigation-drawer-left .current .v-avatar > i {
        font-size: 30px !important;
    }

    .headline {
        font-size: 36px !important;
        margin-left: 5px;
        color: white;
        display: inline-block;
    }

    .progress-line {
        border-left: 1px solid #fefefe;
    }

    .incomplete .progress-line,
    .current .progress-line {
        opacity: .72;
        border-left-style: dashed;
    }

    .progress-line {
        height: 100%;
        position: absolute;
        left: 36px;
        margin-top: 28px;
    }

    .progress-list .v-avatar i.v-icon {
        color: #222 !important;
    }

    div.current .v-avatar i.v-icon {
        filter: brightness(99%);
    }

    div.incomplete .v-avatar i.v-icon {
        filter: brightness(95%) saturate(10%);
        opacity: .94;
    }

    /*THEMES*/

    .v-navigation-drawer {
        background: #221068 !important;
    }

    .progress-list {
        /*height:85%;*/
    }

    .progress-error {
        margin-left: -15px;
        z-index: 1;
        background: red;
        color: white;
        width: 17px;
        border-radius: 17px;
        height: 17px;
        line-height: 17px;
        margin-top: -18px;
    }

    .v-avatar {
        margin-right: 0 !important;
    }

    .v-avatar > span {
        font-size: 12px;
    }

    .current .v-avatar > span {
        font-size: 16px;
    }

    .current .v-avatar > i {
        font-size: 23px !important;
    }

    .progress-list .v-avatar > i {
        font-size: 17px !important;
    }

    .v-list--three-line .v-list-item .v-list-item__content, .v-list-item--three-line .v-list-item__content {
        align-self: center;
    }

    .v-tooltip__content {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        font-size: 22px;
        opacity: 1 !important;
        box-shadow: 4px 4px 5px -2px #888;

    }

    .main {
        font-size: 17px !important;
        /*color: #e0dddd;*/
    }

    .summary {
        opacity: .7;
    }

    .headline-container .loc-stepper {
        display: flex;
    }

    .list-container {
        position: relative;
        outline: 1px solid green;
        height: 100%;
    }

    .location-list {
        top: 120px;
        right: 3px;
        left: 60px;
        /*min-height:200px;*/
        position: absolute;
    }

    .location-list h3 {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }

</style>


<style scoped lang="sass">

</style>
