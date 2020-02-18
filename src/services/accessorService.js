import store from '../store/store'
import {get,set} from 'vuex-pathify'

// typically this is VUEX based but it can be hooked up to any variable, a DB, localStorage whatever...

const STOREPREFIX = 'data/root@'

export default {

    get(path) {
        path = this.asPathify(path)
        console.log('getting ' + path)
        return store.get( path)
    },

    set(path, value) {
        path = this.asPathify(path)
        console.log('setting ' + path + ' to ' + value)
        store.set( path, value)
    },

    asPathify(path) {
        // path can be array or string or number...
        // if number, then treat is as an index.
        // e.g. ['client', 'address', 3, 'city'] ==>    data/root@client.address[3].city
        path=[path].flat(2)
        return path.reduce((a,c,i)=> {
            if (typeof c=='number') {
                return '['+c+']'
            }
            // skip the dot on the first one...
            let prefix = i==0 ? '' : '.'
            return prefix+c
        }, STOREPREFIX)
    }

}
