import Vue from 'vue'

const app = {
    namespaced: true,
    state: {
        theme:'default-theme',

        /* stores app wide validation results */
        validation: null,

        bar: {
            clippedLeft:true
        },

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

