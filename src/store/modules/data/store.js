import { make } from "vuex-pathify"


// use to hold the data.  (policy/quote for example) or whatever document you're reading in and working on.
const state = {
    root: {
        name:'Derek',
        locations:[{city:'Toronto', country:'Canada'},{city:'Los Angeles', country:'USA'}],
        foo: 'hello',
        bar: 'goodbye'
    },
    transient: {
        // anything you want to put here but dont want to persist as part of state.
        // for example, you may have RADAR results that you keep during the SPA life, but
        // dont want to save to the policy DB.
    }
}

const mutations = make.mutations(state)

const data = {
    namespaced: true,
    mutations,
    state,
}

export default data



