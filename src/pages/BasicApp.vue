<template>
    <v-container fluid style="background: mistyrose;">
        PAGE:{{page}}  ITEM:{{item}}

        config:{{currentPage.label}}

        <config-form
                :form="currentPage">
        </config-form>
    </v-container>
</template>

<script>

    import ConfigForm from "../components/configurable/Form"
    import {get,set,sync} from 'vuex-pathify'

    export default {
        components: {ConfigForm},
        props: ['page', 'item'],

        computed: {
            pages: get('app/pages')
        },

        data: () => ({
            currentPage:null,
        }),

        created() {
            // should put this in VUEX??? nah, it's in the URL...
            this.currentPage=this.pages[this.page]
            if (!this.currentPage.id) {
                // give it default ID based on property name.
                this.currentPage.id = this.page
            }
            // assert config exists...if not jump to error page.  OR commit to VUEX exception. and app will have a
            // dialog/overlay to show msg.
            // set('app/exception', {msg: 'cant do this or that', cause:[], })
        }
        // look at page,item, app and load config appropriately.
        // for RATER app, need drawer config?

    };
</script>


<style lang="sass">
</style>
