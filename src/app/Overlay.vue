<template>

    <!--note that once the overlay is hidden, you will lose any information that it may have contained.-->

    <v-overlay
            v-if="visible"
            :absolute="overlay.absolute"
            :opacity="overlay.opacity"
            :value="!!overlay"
            :z-index="overlay.zIndex"
    >
        <template v-if="overlay.progress">
            <v-progress-circular v-if="overlay.progress.type=='circle'"
                                 :indeterminate="!overlay.progress.determinate"
                                 :size="overlay.progress.size||64">
            </v-progress-circular>
            <v-progress-linear v-else
                               :background-opacity="overlay.progress.opacity||.5"
                               :height="overlay.progress.height||32"
                               :indeterminate="!overlay.progress.determinate"
                               :striped="striped"
                               :value="overlay.progress.value||50"
                               :color="overlay.progress.color||'blue'"
            ></v-progress-linear>
        </template>
        <template v-if="overlay.layout">
            <configurable-component-container
                    :layout="overlay.layout"
            >
            </configurable-component-container>
        </template>
    </v-overlay>

</template>

<script>

    import {get, sync} from 'vuex-pathify'

    export default {
        data: () => ({
            visible:false,
            timer:null,
        }),

        computed: {
            overlay: sync('app/notification@overlay')
        },

        methods: {
        },

        watch: {
            overlay(newValue, oldValue) {
                if (newValue) {
                    setTimeout(()=>this.visible=true, 300)
                }
                else {
                    this.visible=false
                    if (this.timer) {
                        clearTimeout(this.timer)
                        this.timer=null
                    }
                }
            }
        }

    };
</script>

<style scoped lang="sass">

</style>
