import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './pages/HelloWorld'
import Header from './pages/Header'
import NoAccess from './pages/NoAccess'
import FooBar from './pages/FooBar'
import Stepper from './components/Stepper'
import Secret from './pages/SecretPage'


export default [
    {
        path: '/apps/rater',
        props: {header: {title: 'Sssssh'}},
        name: 'Rater',
        components: {default: BasicApp, header: Header},
        children: [
            {
                path: ':page',   // e.g.    /apps/rater/locations
                component: PageView,
                children: [
                    {           // e.g.     /apps/rater/locations/23
                        path:':item',
                        component: ItemView
                    }
                ]
            }
        ]
    },

    {
        path: '/apps/:app/:page',
        props: {header: {title: 'Hello'}},
        name: 'configurableApp',
        components: {default: Secret, header: Header},
        children: [
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: ':page',
                component: ConfigurablePage
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'posts',
                component: UserPosts
            }
        ]

    }

]
