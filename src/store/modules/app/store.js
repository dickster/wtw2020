import Vue from 'vue'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'



const app = {
    namespaced: true,
    state: {
        theme:'default-theme',
        // drawer state,
        // footer options,
        // header & toolbar options
        // date formats, number formats etc....
    },
    mutations: mutations,
    actions: actions,
    getters: getters
}

export default app

