export default {

    perform(context, action) {
        // change this to dispatch('app/notification', action.notification) because its in a different VUEX module.

        // context.dispatch('app/busy', true, {root: true})
        // context.dispatch('app/notification', action.notification, {root: true})

        // this part handles the non-VUEX/Router details.
        // processing/mapping data & return values.

        let _actionMsg = function(action) {
            return typeof action == 'string' ? action :
                action.id || '' + ' : ' + action.type || '' + '  ' + action.url || ''
        }

        let that = this
        return this.$serviceContainer.workflowActionService.perform(action, context.rootState)
            .then(r => {
                if (action.commit) {
                    // commit could be 'data/update', payload = { ...action, data:response }
                    // action will have {module}/foo.bar so know where to put it in state.
                    // will do a
                    // 'app/updateRoute' payload = { response }
                    context.commit(action.commit, r, {root: true})
                }

                context.dispatch('log/log', {
                    level: action.level || 'info',
                    msg: 'success : ' +  _actionMsg(action),
                    ...r
                }, {root: true})
            }, e => {
                // TODO : set error state here...snackbar,logging etc...
                //  this.dispatch('notification', {error notificationConfig})
                context.dispatch('log/log', {
                    ...e,
                    level: 'error',
                    msg: 'error running ' + _actionMsg(action)
                }, {root: true})
            })
            .finally(() => {
                // context.dispatch('app/busy', false, {root: true})
            })

    },

}
