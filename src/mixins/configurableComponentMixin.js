
import {get, set} from 'vuex-pathify';


export default {
    props: ['config', 'parent'],
    inject:['evaluationService'],
    components: {},

    data: function() {
        return {
            // this can be either a single error/warning or array of.
            validation: null,
            parentPath: this.parent || [],
            errorMessages:[]
        }
    },

    computed: {

        // VUEX has predefined context which is .js code run (independent of data) and returns an object.
        // this code must be run on server side...should be part of expression service.

        valid() {
            return true
        },

        visible() {
            if (!this.config.visible) return true;
            return this.evaluationService.evaluate(this.config.visible, this.exprContext())
        },

        clearValidation() {
            this.validation = null
        },

        isValid() {
            return !this.validation
        },

        value: {
            get() {
                // TODO : add parent stuff to store access.
                return this.$store.get('data/root@'+this.config.bind)
            },
            set(value) {
                return this.$store.set('data/root@'+this.config.bind, value)
            }
        },


        items() {
            // change this to use a repository instead of being tied to axios directly!
            // listRepository.get(key).then(...)

            // if (!this.config.items) {
            //     this.config.items = {key:""}
            //     // this.config.items = {key:"bogusKeyThatShowsInvalidListItems"}
            // }
            //
            // if (Array.isArray(this.config.items) || !this.config.items) {
            //     return this.config.items
            // }
            //
            // let url = this.config.items.url
            //
            // if (this.config.items.key) {
            //     url = 'https://ixsppmcem20as02axa.azurewebsites.net/api/dropdownlists/'
            //         + this.config.items.key
            // }
            // if (!url) {
            //     throw 'component has no items defined - specify array of values or url via KEY or URL'
            // }
            //
            // if (!this.itemData || this.$store.getters.editorMode) {
            //     let that = this
            //     // this.loading = true
            //     let data = axios.get(url)
            //         .then(function (response) {
            //             that.itemData = response.data.values
            //         })
            //         .catch(function (error) {
            //             console.log(error);
            //         })
            //         .finally(function () {
            //             //        that.loading = false
            //         });
            // }

            return this.itemData
        },

        width() {
            // TODO : add ability to handle platform.
            // e.g. return config.mobile.width||config.width
            return this.config.width
        },

    },

    created() {
        console.log('parent ' + this.parent);
    },

    methods: {
        exprContext() {
            // get default context which contains useful macros from VUEX (it is set there at load time).
            //
            //
            // note that this SHOULD NOT be a computed property because it will not be called every time you do an evaluation.
            //   which is wrong, because it can involve expressions that outside of reactivity and MUST be called.
            //   e.g.   $now : "new Date()"     <--must be called at time of expression evaluation!!

            // in order to add new macro variable, you need to update module on client and server...hmmm.
            //   if the definition is simple javascript then they can be expressions?
            //  config.customVars = {
            //    $today:"new Date()"
            //    $exchangeRate:"343",
            //    $broker: { client: 'bob' }
            //    $mediaType: { client: 'small' }
            //   }
            //   @@it's possible that some validations should only be done on the client side.

            let context = {
                $today: "new Date()",
                $me : "'Derek'",
            }
            let modules = this.$store.getters.modules

            let that = this
            let reducer = function(a,k) {
                a[k]=that.evaluationService.evaluate(context[k], modules)
                return a
            }

            context['$'] = "data.root"

            return Object.keys(context).reduce( reducer, {})

        },

        emit(name,$event) {
            //TODO: allow custom naming of event.
            // default is to use bind.
            //  e.g.   source: config.eventName||config.bind

            //currently only handles change events, but others can be added...blur/focus/key/mouse etc...
            this.$emit('wtw-event', {
                name:name,
                event: $event,
                parent: this.parent,
                source: this.config.bind,
                config: this.config,
                value: this.value
            })
        },





    }
}

