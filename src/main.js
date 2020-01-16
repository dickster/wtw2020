import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/store'
import Vuex from 'vuex'
import 'vue-googlemaps/dist/vue-googlemaps.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueCurrencyFilter from 'vue-currency-filter'
import vueNumeralFilterInstaller from 'vue-numeral-filter'
import VueObserveVisibility from 'vue-observe-visibility'
import moment from 'moment'
import VueTheMask from 'vue-the-mask'
import Vuetify from "vuetify/lib";

Vue.config.productionTip = false

Vue.use(VueTheMask)
Vue.use(VueObserveVisibility)

Vue.use(vueNumeralFilterInstaller, {locale: 'en-gb'});

Vue.use(VueGoogleMaps,
    {
        load: {
            key: 'AIzaSyDyYXBKQv-KQwHFf7TcRCzaNO8RlNZ5n9U',
            libraries: 'places',
            // This is required if you use the Autocomplete plugin
            // OR: libraries: 'places,drawing'
            // OR: libraries: 'places,drawing,visualization'
            // (as you require)

            //// If you want to set the version, you can do so:
            // v: '3.26',
        }
    })


Vue.use(VueCurrencyFilter,
    {
        symbol: '£',
        thousandsSeparator: '.',
        fractionCount: 2,
        fractionSeparator: ',',
        symbolPosition: 'front',
        symbolSpacing: true
    })


Vue.config.productionTip = false


Vue.filter('dateFilter', function(value) {
    if (value) {
        return moment(String(value)).format('YYYY-MM-DD')
    }
})


function allowAccess(to,from) {
    return to.name!='secret'
}


router.beforeEach((to, from, next) => {
    if (to.name!='no-access' && !allowAccess(to,from)) next(
        {
            name:'no-access',
            params:{target:to, reason:'access not allowed', back:from||{name:'login'}}
        });
    else next()
});



new Vue({
    data() {
        return { /* put any global data you want here */};
    },
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app')

