import Vue from 'vue'


const app = {
    namespaced: true,
    state: {
        theme:'default-theme',

        drawer: {
            miniWidth: 90,
            mini: false,
            visible: true,
            width: 300
        }

        // footer options,
        // header & toolbar options
        // date formats, number formats etc....
    }
}

export default app

