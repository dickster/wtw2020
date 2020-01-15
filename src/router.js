import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/HelloWorld'
import Header from './components/Header'
import FooBar from './components/FooBar'
import Nav from './components/Nav'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            props: { title:'hello'},
            name: 'helloworld',
            components: {default: HelloWorld, header: Header, nav: Nav}
        },
        {
            path: '/foo',
            props: {title:'Foo'},
            name: 'foo',
            components: {default:FooBar}
        }
    ]
})
