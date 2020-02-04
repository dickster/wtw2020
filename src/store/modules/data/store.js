import { make } from "vuex-pathify"


// use to hold the data.  (policy/quote for example) or whatever document you're reading in and working on.
const state = {
    root: {
        foo: 'hello',
        bar: 'goodbye'
    }
}

const mutations = make.mutations(state)

const data = {
    namespaced: true,
    mutations,
    state,
}

export default data



