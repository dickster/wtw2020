<template>

    <div class="caption">
        {{statusText}}
    </div>

</template>

<script>

    // NOTE: don't name this "footer" because you can't have Vue components that conflict.

    import {get, sync} from 'vuex-pathify'

    export default {
        components: {},
        data: () => ({
            statusText: '',
            timer:null,
        }),

        computed: {
            status : get('app/notification@status')
        },

        methods: {},

        watch: {
            status(newValue, oldValue) {
                if (newValue) {
                    if (this.timer!=null) {
                        clearTimeout(this.timer)
                        this.timer = null
                    }
                    this.statusText = newValue
                }
                else {
                    // would be better if I could fade out text.
                    this.timer = setTimeout(()=>this.statusText=null, 1000)
                }
            }
        }

    };
</script>

<style scoped lang="sass">

</style>
