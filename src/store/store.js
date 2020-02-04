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

Vue.use(Vuex)

const modules = {app, context, data, settings}

export default new Vuex.Store({
    state: {
        /* its all declared within the modules..nothing here */
    },
    getters: {
        modules(state) {
            return {
                app:app.state,
                context:context.state,
                data:data.state,
                settings:settings.state
            }
        }
    },
    modules: modules,
    plugins: [pathify.plugin]
})

