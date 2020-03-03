import Vue from 'vue'
import Vuex from 'vuex'

/*
   @see https://davestewart.github.io/vuex-pathify/#/setup/config
    Failing to import Pathify configuration before store imports will result in the default settings being used.
    This will result in a broken app and lots of console errors as mutation and action identifiers will be wrong.
*/
import pathify from './pathify'

import workflowAction from './modules/workflowAction/store'
import app from './modules/app/store.js'
import context from './modules/context/store.js'
import data from './modules/data/store.js'
import settings from './modules/settings/store.js'
import log from './modules/log/store'

Vue.use(Vuex)

const _modules = {app, context, data, settings, workflowAction, log}

// Note that the store will have serviceContainer injected into it.  so any modules wanting a repo/service can use
//    serviceContainer.someRepository
export default new Vuex.Store({
    state: {
        /* its all declared within the modules..nothing here */
    },
    actions: {
        test({commit}, payload) {
            console.log('serviceContainer ' + this.$serviceContainer)
        }
    },
    getters: {
        modules(state) {
            return Object.keys(_modules).reduce((a, c) => {
                a[c] = _modules[c].state;
                return a
            }, {})
        }
    },
    modules: _modules,
    plugins: [pathify.plugin]
})

