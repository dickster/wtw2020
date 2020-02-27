import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './pages/HelloWorld'
import NoAccess from './pages/NoAccess'
import FooBar from './pages/FooBar'
import Stepper from './components/Stepper'
import Secret from './pages/SecretPage'
import BasicApp from './pages/BasicApp'

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

        // each app loaded at login has  routes.

        // /rater/{id}   children-> /rater/{id}/{page}  : children-> /rater/{id}/{page}/{itemId}
        // /{app}  if they require hard coded components, then they will be in codebase and filtered out.
        //  if they are all dynamic,  (header uses configuration, stepper uses config, etc...
        // when loading configurable app, look for component named apps/{appName}.  OR look for
        // NO, always must hard code routes.   ALL routes will be added at login based on permissions.
        //  routeRepository.forUser($me).getRoutes().install()

        // preinstalled

        // apps.config = {
        //   all the predefined apps & their routes here...
        //   {configurableApp}/  {page} / {itemId}   *last, other routes take precedence.
        // generic app consists of listing items, and displaying/editing them
        // need2 a generic JSON editor component which iterates over properties of object and lets you edit them.
        //   add config to exclude them, change types etc...if no config, behaves in default manner.
        // will need an endpoint to send the data.   won't save it
        //  endpoints to configure : save,  (automatically, like drafts).
        //    "Finish" where to post.
        // e.g. configurable app for brokers. does REST call (or GraphQL) via configured URL.
        //  gets data.  configure ItemListing.
        // in List Mode, shows list of properties.  (picks ones like name, text, desc, created, id, by default).
        // default behaviour for click is to show "editor/viewer" in view mode.
        //   which iterates over properties..user can save personal settings for app - "dont show this column" etc...

        {
            path: '/apps/rater',
            props: {
                header: {title: 'rootview'},
            },
            name: 'Rater',
            components: {default: BasicApp, nav:Stepper}
        },

        {
            path: '/apps/rater/:page',   // e.g.    /apps/rater/locations
            components: {default: BasicApp, nav: Stepper},
            props: {
                default: (route) => ({page: route.params.page})
            }
        },

        {
            path: '/apps/rater/:page/:item',
            props: {
                default: (route) => ({page: route.params.page, item:route.params.item}),
            },
            components:{default:BasicApp},
        },

{
    path: '/',
    name: 'helloworld',
    components: {default: HelloWorld, nav: Stepper}
},
{
    path: '/secret',
    name: 'secret',
    components: {default: Secret}
},
{
    path: '/foo',
    name: 'foo',
    component: FooBar
}


]
})
