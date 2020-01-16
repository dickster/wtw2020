import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/HelloWorld'
import Header from './components/Header'
import NoAccess from './components/NoAccess'
import FooBar from './components/FooBar'
import Nav from './components/Nav'
import Secret from './components/SecretPage'

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
            components: {default: HelloWorld, header: Header, nav: Nav}
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
