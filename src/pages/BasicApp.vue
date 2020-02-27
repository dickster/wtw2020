<template>

    <page :page="currentPage"></page>

</template>

<script>

    import Page from "../components/configurable/Page"
    import {get, set, sync} from 'vuex-pathify'

    export default {
        components: {Page},
        props: ['page', 'item'],

        computed: {
            pages: get('app/pages'),
            current: sync('app/basicApp@current')
        },

        data: () => ({
            currentPage: null,
        }),

        created() {
            this.current = { page: this.page, item: this.item }
            this.currentPage = this.pages.find(p=>p.id==this.page)
            if (!this.currentPage) throw  "cant find page " + this.page + "...are you sure you have a page with this id?"
        }

    };
</script>


<style lang="sass">
</style>
