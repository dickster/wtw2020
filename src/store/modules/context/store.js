import Vue from 'vue'


// use for things like user, date, locale, tenant etc...
const context = {
    namespaced: true,
    state: {
        user:{ name: 'Derek Dick', id: 45, token: 'asdfasdf' }
    }
}

export default context


