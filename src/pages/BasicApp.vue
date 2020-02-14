<template>
    <v-container fluid style="background: mistyrose;">
        PAGE:{{page}}  ITEM:{{item}}

        config:{{currentPage.label}}
        <!--implicitly leaving :parent out at top level which means use vuex::/app/data -->
        <!--ToDO: add injected accessor as prop.
        e.g. :accessor=VUEXPathifyAccessor.withRoot('data/root')-->
        <dynamic-form
                :page="currentPage">
        </dynamic-form>
    </v-container>
</template>

<script>

    import DynamicForm from "../components/DynamicForm"
    import {get,set,sync} from 'vuex-pathify'

    export default {
        components: {DynamicForm},
        props: ['page', 'item'],

        computed: {
            pages: get('app/pages')
        },

        data: () => ({
            currentPage:null,
        }),

        created() {
            this.currentPage=this.pages[this.page]
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
