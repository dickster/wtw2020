import store from '../store/store'
import {get,set} from 'vuex-pathify'


// this is a JSONata based mapping.  could switch over to JSONPath 2 or jsonQuery or....
export default {

    inject :['logRepository'],

    // options = {value, context, mapping}
    // returns the mapped object.
    // e.g. value= { foo: { bar: 'hello' } }
    //      mapping = { x : 'foo.bar', y: "'Joe'" }
    // result = { x: 'hello', y:'Joe' }

    map(options) {
        if (!options.mapping) return options.value
        // TODO : implement this. NOP for now..
        return options.value
    }

}
