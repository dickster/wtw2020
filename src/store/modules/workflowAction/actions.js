import router from '../../../router'
import WorkflowAction from  './workflowAction'
import axios from 'axios'

const actions = {


    perform({state, commit, rootState}, action) {

        commit('notification', action.notification)

        let workflowAction = new WorkflowAction(action)

        let p = workflowAction.perform()
            .then(r=>{
                console.log('action route returned = ' + JSON.stringify(r))
                router.push(r)  // if null, then do nothing.
            }, e=>{
                // TODO : set error state here..snackbar,logging etc...
            })
            .finally(()=>commit('resetNotification'))

    }

}


export default actions

