import Vue from 'vue'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'



const context = {
    namespaced: true,
    state: {
        user:'Derek Dick',
    },
    mutations: mutations,
    actions: actions,
    getters: getters
}

export default context

