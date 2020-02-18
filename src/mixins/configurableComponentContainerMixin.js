
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
        emitIndexedInput($event, index) {
            //TODO: return function with args index:=??   need to handle arrays for TabSection like components.
        }
    }
}

