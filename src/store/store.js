import Vue from 'vue'
import Vuex from 'vuex'

/*
   @see https://davestewart.github.io/vuex-pathify/#/setup/config
    Failing to import Pathify configuration before store imports will result in the default settings being used.
    This will result in a broken app and lots of console errors as mutation and action identifiers will be wrong.
*/
import pathify from './pathify'

import app from './modules/app/store.js'
import context from './modules/context/store.js'
import data from './modules/data/store.js'
import settings from './modules/settings/store.js'
import workflowAction from './modules/workflowAction/store'

Vue.use(Vuex)

// TODO : change to createModule(app)
const m = {app, context, data, settings, workflowAction}

// Note that the store will have serviceContainer injected into it.  so any modules wanting a repo/service can use
//    serviceContainer.someRepository
export default new Vuex.Store({
    state: {
        /* its all declared within the modules..nothing here */
    },
    actions: {
        test ({ commit }, payload) {
            console.log('serviceContainer ' + this.$serviceContainer)
            }
        },
    getters: {
        modules(state) {
            return Object.keys(m).reduce((a,c)=>{
                a[c]=m[c].state;
                return a
            },{})
        }
    },
    modules: m,
    plugins: [pathify.plugin]
})

