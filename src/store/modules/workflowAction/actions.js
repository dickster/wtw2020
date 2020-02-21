import router from '../../../router'

const actions = {

    perform({state, commit, rootState}, action) {
        // do something...
        console.log('performing...' + JSON.stringify(action))
        router.push('/apps/rater/fleet')
    }
}


export default actions

