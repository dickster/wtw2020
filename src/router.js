import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './pages/HelloWorld'
import Header from './pages/Header'
import NoAccess from './pages/NoAccess'
import FooBar from './pages/FooBar'
import Stepper from './components/Stepper'
import Secret from './pages/SecretPage'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
       {
            name: 'no-access',
            component: NoAccess,
            props: true,
            path: '/no-access',
            meta: {
                icon: 'bug_report',
                title: 'Oops'
            }
        },
        {
            path: '/',
            props: { header:{title:'hello'}},
            name: 'helloworld',
            components: {default: HelloWorld, header: Header, nav: Stepper}
        },
        {
            path: '/secret',
            props: { header:{title:'Sssssh'}},
            name: 'secret',
            components: {default: Secret, header: Header}
        },
        {
            path: '/foo',
            props: { header:{title:'foo'}},
            name: 'foo',
            component: FooBar
        }
    ]
})
