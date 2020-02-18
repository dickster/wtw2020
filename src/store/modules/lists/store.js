import Vue from 'vue'
import {make} from "vuex-pathify";

// there should be a bunch of actions here that are dispatched when a component is created and needs a list.
const state = {
            // all lists should be stored here.
            // sort of a global cache management because validation could use them.
    }

const mutations = make.mutations(state);


const lists = {
    namespaced: true,
    state:state,
    mutations
    //    TODO : add actions that use listRepository to get any list that is not there.
    // later on will have to deal with versioning.
}

export default lists


// get('lists/foo')

//configurableComponent -> items() { get('lists/'+config.items.key) }

// that way I can switch out listRepository with stub one that has predefined values.
// how to inject service into store???
