import Vue from 'vue'

import pages from './pages'

const app = {
    namespaced: true,
    currentPage: null,
    state: {
        theme:'default-theme',

        /* stores app wide validation results */
        validation: null,

        bar: {
            clippedLeft:true
        },

        pages:pages,

        drawer: {
            miniWidth: 90,
            clipped:true,
            mini: false,
            visible: true,
            width: 300
        }

        // footer, header, error, dialogs, etc...
    }
}

export default app

