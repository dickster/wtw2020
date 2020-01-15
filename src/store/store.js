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

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        foo: 883
    },
    modules: {app, context},
    plugins: [pathify.plugin]
})

