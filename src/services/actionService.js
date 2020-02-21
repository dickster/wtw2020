import store from '../store/store'
import {get,set} from 'vuex-pathify'
import Vue from 'vue';



const ActionEventBus = new Vue();


export default {

    handlers: {
        'next':a=> this.advance(+1),
        'prev':a=> this.advance(-1),
        'first': a=> this.go(0),
        'last': a=> this.go(),
        '@post': a=> this.post(a),
        '@get': a=> this.post(a),
        '@delete': a=> this.delete(a),
        '@put': a=> this.post(a),
        '@method': a=> this.invoke(a)
         //patch etc...

    },

    registerHandlers(customHandlers) {
        // handler contract is to respond with { code:...   msg:... }
        // Object.keys().forEach(key=>this.handlers[key] = customHandlers[key]
    },

    // dispatch action...update VUEX - workflow state.  watch app.current { page: item: }

    perform(action) {
        // do default stuff.
        // use actionHandler to lookup handler and call perform(action).
        // actions can have different types = METHOD  (fooService.blargh), URL/AXIOS,
        // e.g. 'next'.
        // if 'next' -> get list of pages. (not states!) and find the next enabled one.
        // find the method to call
        // switch (actionId) {
        //
        let handler = this.handlers[action.id] || this.handlers['@'+action.type]




        let response = this.transformResponse(handler(action))

        let transition = this.doTransition(response  /* assumes current state is known somewhere */)
        // transition = { pageName:'clientInfo' }
        // transition = { path:'/rater/clientInfo' }
        // transition = { name: $namedRoute.  e.g. 'login' }

        this.$router.push(transition)


    }

}
