import actions from './actions'
import {make} from 'vuex-pathify'

const state = {

};

const mutations = make.mutations(state)


const workflowAction = {
    namespaced: true,
    state,
    actions,
    mutations
}

export default workflowAction

