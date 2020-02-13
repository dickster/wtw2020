
import {get, set} from 'vuex-pathify';
import evaluationService from "../services/evaluationService";


export default {

    props: ['config', 'parent'],
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
        // TODO : need to handle array inputs here.
        // ie. parent = this.parent/:index
        emitInput($event) {
            this.$emit('wtw-input', {...$event, parent:[this.parent]})
        },
        emitIndexedInput($event,index) {
            this.$emit('wtw-input', {...$event, parent:[this.parent, index]})
        }

    }
}

