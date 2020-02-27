import { make } from "vuex-pathify"
import actions from './actions'

// use to hold the data.  (policy/quote for example) or whatever document you're reading in and working on.
const state = {
    events:[]
}

const mutations = make.mutations(state)

const log = {
    namespaced: true,
    mutations,
    actions,
    state,
}

export default log
