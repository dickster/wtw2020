import pages from './pages'
import { make } from "vuex-pathify"

const state = {
        theme:'default-theme',

        /* stores app wide validation results */
    // should maybe create room for named validations.
    // i.e. if a form had id="form37", there would be app/validation@form37: true.
    //
        validation: {
            form:true
        },

        bar: {
            clippedLeft:true
        },

        pages:pages,

        drawer: {
            miniWidth: 90,
            clipped:true,
            mini: false,
            visible: true,
            width: 300
        }

        // footer, icons@bottom, header, error, dialogs, etc...
};

const mutations = make.mutations(state)


const app = {
    namespaced: true,
    state,
    mutations
}

export default app

