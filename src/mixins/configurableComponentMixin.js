
import {get, set} from 'vuex-pathify'


export default {
    props: ['config', 'parent'],
    inject:['evaluationService', 'accessorService'],
    components: {},

    data: function() {
        return {
        }
    },

    computed: {
        value: {
            get() {
                // console.log(JSON.stringify(this.config) + ' ' + this.path)
                return this.accessorService.get(this.path)
            },
            set(v) {
                // console.log(JSON.stringify(this.config) + ' ' + this.path)
                return this.accessorService.set(this.path, v)
            }
        },
        componentType() {
            let type=this.config.type
            return () => import(`../components/configurable/${type}.vue`);
        },
        path() {
            return [this.parent||[], this.config.bind||[]].flat()
        },
        rules() {
            let context = this.context
            return this.config.validation ? [
                this.evaluationService.ruleFor(this.config.validation)] : []
        },

        items() {
            // if empty... $store.dispatch('lists/${config.items.key})
            // return get('lists/...' )
        },

        visible() {
            if (!this.config.visible) return true;
            return this.evaluate(this.config.visible)
        },

        width() {
            // TODO : add ability to handle platform.
            // e.g. return config.mobile.width||config.width
            return this.config.width
        },

    },

    created() {
    },

    methods: {

        evaluate(expr) {
            return this.evaluationService.evaluate(expr, this.exprContext)
        },



    }
}

