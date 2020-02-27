import axios from 'axios'

export default class WorkflowAction {

    // action: { get: { url: '../service/...', mapIn:{}, mapOut:{}}

    // these ones rely on state table.
    // can have direct ones that return route
    static handlers = {
        'next': v => this.advance(1),
        'prev': v => this.advance(-1),  // TODO : add optional "wrap" parameter
        'first': v => this.go(0),
        'last': v => this.go(-1),
        '@post': v => this.post(v),
        '@get': v => this.post(v),
        '@delete': v => this.delete(v),
        '@put': v => this.post(v),
        '@method': v => this.invoke(v)

        // if you want to add your own handlers, you could either
    }

    // NOTE that these are registered at a global level.
    // if you want to have an action specific handler, put it in the config directly.
    // i.e. config.action.handler = ()=>{ doStuff() }
    static addHandler(name, handler) {
        WorkflowAction.handlers[name] = handler
    }

    constructor(action) {
        this.action = action
    }

    // dispatch action...update VUEX - workflow state.  watch app.current { page: item: }


    perform() {
        console.log('performing...')
        let handler = this.getHandler()


        if (!handler) {
            throw 'cant find handler for action ' + JSON.stringify(this.action)
        }
        console.log('handler == ' + handler())

        return new Promise((res, rej) => {
            Promise.resolve(handler())
                .then(v => res(this.routeFor(v)))
                .finally()
        })
    }


    getHandler() {
        // if action contains a handler function, give it first priority.  otherwise lookup by action type and id.
        let id = typeof this.action=='string' ? this.action:this.action.id
        return this.action.handler ||
            WorkflowAction.handlers[id] ||
            WorkflowAction.handlers['@' + this.action.type]
    }

    matches(matchSpec, value) {
        if (!matchSpec || matchSpec == '*') return true

        // range or value. * = true
        let result = undefined
        if (matchSpec.min || matchSpec.max) {
            let min = matchSpec.min || 0
            let max = matchSpec.max || Number.MAX_SAFE_INTEGER
            result = value >= min && value < max
        } else if (Array.isArray(matchSpec.value)) {
            // could be an array of values or a single value.
            result = value.reduce((a, c) => a || this.matches(c, value))
        } else {
            result = matchSpec == value
        }

        return matchSpec.not ? !result : result
    }

    routeFor(response) {

        // response is either an object like { code: ??, http: ?? } or a primitive in which case it is assumed to
        // be the equivalent of   { code: <primitiveValue>, http:200 }
        // TODO : lookup.  handle expr like :  [0...100], 1,3,5 !<expr>,  5|200,  [0..100]|>0

        let transition = this.action.transition

        // assumed if you didn't configure transition, the handler will return a route for you
        // and it will be returned directly.
        if (!transition) {
            return response
        }

        let resp = {code: transition.code || transition, http: transition.http}

        let match = transition.find(t => {
            return this.matches(t.code || t, resp.code) && this.matches(t.http, resp.http)
        })

        if (!match) {
            // deal with catchall.  navigate to error page.
        }
        return match
    }

    start() {
        // pass any notification object on.


        // possibly set state depending on action config.
        // action.overlay = {...}
        // action.progress = true||{mode:'circular' etc...}
        // action.snackbar = 'heres a msg for snackbar' || { skipLogging: true, msg: 'blah blah' }
        // let status = action.status
        // $store.set('app/:status', action.status)

        // should have a default status of 'set progress status spinning icon'
        // == $store.set('app/spinner',true)
    }

    end() {
        console.log('ending...')

        // action.transition=true OR
        // action.transition = overlay: { }  ||  progress: {} etc...
        // passed directly to store.set('app/transition')
        // reset any states you set in start.
        // overlay = false, progress=false, etc...
        // $store.set('app/:status',false)
    }

    handleResponse(response, action) {
        response = this.transformResponse(response, this.action.response)
        let route = this.getTargetRoute(response, this.action.transition)
        return route
    }

    transformResponse(response, config) {
        // TODO : use config to map response.
        // e.g if response={value:-1, error: { source:'foobar' } }
        //  then config would be something like... { code: 'value', msg: 'error.source' }
        // which would result in the standardized object expected = {code:??, msg:??}  OR just <code>  (can be primitive or object)
        return response
    }

    invoke() {
        // what is 'this' context??  invoker may have to explicitly pass this in.
        // let action = config.action
        // action.context = <whateverYouWant>
        // dispatch('perform',a)
        return 0
    }

    go(pageNum) {
        // returns a Vue-router route object.  something that lets you...  $router.push( <routeValue> )
        return '/apps/rater/fleet'
    }

    static advance(amount) {
        // TODO : scan VUEX::pages look for next one.
        //  need to determine current one?  how??  based on VUEX::route/{app}/{page}
        console.log('advancing ' + amount)

        return 'fleet'
    }

    put(action) {
        // TODO: add parameters. transform parms first.
        // need to have general error handling.
        return axios.put(this.action.url)
    }

    get(action) {
        return axios.get('')
    }

    post(action) {
        return axios.post('')
    }

    delete(action) {
        return axios.delete('')
    }

    patch(action) {
        return axios.patch('')
    }

}




