
import {get, set} from 'vuex-pathify';
import evaluationService from "../services/evaluationService";


export default {

    props: ['config'],
    components: {},

    data: function() {
        return {
        }
    },

    computed: {
    },

    created() {
    },

    methods: {
        emitInput($event) {
            // just rethrow it as is.  only forms (top level) & section containers need to augment event.path with their bindings.
            this.$emit('wtw-input', $event)
        },

        emitIndexedInput($event, index) {
            //TODO: return function with args index:=??   need to handle arrays for TabSection like components.
        }
    }
}

