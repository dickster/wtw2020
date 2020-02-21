<template>

    <div>
    <page
            :page="currentPage">
    </page>
    </div>
</template>

<script>

    import Page from "../components/configurable/Page"
    import {get,set} from 'vuex-pathify'

    export default {
        components: {Page},
        props: ['page', 'item'],

        computed: {
            pages: get('app/pages')
        },

        data: () => ({
            currentPage:null,
        }),

        created() {

            console.log(JSON.stringify(this.$route.params))
            // commit this to VUEX! along with item.
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
