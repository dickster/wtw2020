

// typically this is VUEX based but it can be hooked up to any variable, a DB, localStorage whatever...

export default {

    get(path) {
        // path can be array or string...
        console.log('getting ' + path)
    },

    set(path, value) {
      // path can be array or string...
        console.log('setting ' + path + ' to ' + value)
    }


}
