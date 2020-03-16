import {make} from 'vuex-pathify'
import actions from './actions'

const state = {
    result: {
        /*workflow actions that want to deal with navigation will update this value*/
        route: null,
    }
}

const mutations = make.mutations(state)


const workflowAction = {
    namespaced: true,
    state: state,
    actions: actions,
    mutations
}



export default workflowAction

