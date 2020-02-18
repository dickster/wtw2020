import Vue from 'vue'
import {make} from 'vuex-pathify'

const state = {
    // date format,
    // number format,
    // layout preferences.
    //

    // the idea is that the user can configure their own context which can augment/overwrite these values.
    //   for example, they could add
    //   {   $companyName: "'State Farm'", hq: "'London'", $maxCommission: "10", $boss: 'joe' }

    // @see this...w.r.t. dates.
    // https://stackoverflow.com/questions/2698725/comparing-date-part-only-without-comparing-time-in-javascript
    // it should be wrapped in a Moment or date-fns object.   for now i'll let client do that....
    // assumes that all store modules will be passed as variables.
    // e.g. { context, data, app, settings, etc... }
    expressionContext: {
        $today: "new Date()",
            $user: { client: "user"  /*server: not run, ignored*/}
    }
}

const mutations = make.mutations(state)

const settings = {
    namespaced: true,
    state: state,
    actions: {
        test ({ commit }, payload) {
            console.log('serviceContainer ' + this.$serviceContainer)
        }
    },
    mutations

}

export default settings

