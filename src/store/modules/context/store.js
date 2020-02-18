import Vue from 'vue'
import {make} from "vuex-pathify";

const state = {
        user:{ name: 'Derek Dick', id: 45, token: 'asdfasdf' }
}
const mutations = make.mutations(state);

// use for things like user, date, locale, tenant etc...
const context = {
    namespaced: true,
    state: state,
    mutations
}

export default context


