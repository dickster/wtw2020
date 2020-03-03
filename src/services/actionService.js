import axios from 'axios'


export default {

    inject: "all",

    handlers : {
        // TODO : handle other means of communication...
        // '@socket: v=> this.socket
        // '@soap: v=> this.soap,
        '@post': (a,state) => this.doAxios(a, state),
        '@get': (a,state) => this.doAxios(a, state),
        '@delete': (a,state) => this.doAxios(a, state),
        '@put': (a,state) => this.doAxios(a, state),
        '@method': (a,state) => this.invoke(a, state),

        // handlers like 'next', 'first' etc... are NOP handlers.
        // they just pass through
    },

    getHandler(action) {
        // if action contains a handler function, give it first priority.  otherwise lookup by action type and id.
        let id = typeof action == 'string' ? action : action.id
        return action.handler ||
            this.handlers[id] ||
            this.handlers['@' + this.action.type] ||
            this.nopHandler
    },

    perform(action, rootState={}) {
        let handler = this.getHandler(action)

        return handler(action, rootState)
            .then(v => this.handleResponse(v, action))
    },


// {
//     data: {},
//     status: 200,
//         statusText: 'OK',
//     headers: {},
//     config: {},
//     request: {}
// }

    handleResponse(action, response) {
        // transform response... do JSONata mapping with value
        let transformedResponse = this.mappingService({value:response, mapping: action.mapResponse})
        // special type of action that uses state transition table to yield final result which is a router path.
        transformedResponse = this.lookupService.lookup({value:transformedResponse, table:action.lookup})

        return transformedResponse
    },


    // HANDLERS...

    async invoke(action) {
        // "this" can access all injected services.
        // e.g. action = 'fooBarService.doSomething'
        // a useful example might be to use the mappingService on some data.
        //   that way, some calculations could be done within the JSONata .
        //   mapping = { result: 'data.x + data.y * 100' }
        return 0
    },

    async nopHandler(action) {
        return action
    },

    // TODO : need to ensure that http code is added to all responses

    async doAxios(action, rootState) {
        let params = this.mappingService.map({value:rootState, mapping: action.mapParams})
        return axios[action.type](action.url, params||{})
    },

    // async put(action) {
    //     // TODO: add parameters. transform parms first.
    //     // need to have general error handling.
    //     return axios.put(this.action.url)
    // },
    // async get(action) {
    //     return axios.get('')
    // },
    //
    // async post(action) {
    //     return axios.post('')
    // },
    //
    // async delete(action) {
    //     return axios.delete('')
    // },
    //
    // async patch(action) {
    //     return axios.patch('')
    // }

}




