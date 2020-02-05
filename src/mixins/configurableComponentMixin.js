
import {get, set} from 'vuex-pathify';


export default {
    props: ['config', 'parent'],
    inject:['evaluationService'],
    components: {},

    data: function() {
        return {
            // this can be either a single error/warning or array of.
            parentPath: this.parent || [],
        }
    },

    computed: {

        errorMessages() {
            return (this.validation||[])
                .map(v=>v.msg||v.code)
                .join('.  ')
        },

        // VUEX has predefined context which is .js code run (independent of data) and returns an object.
        // this code must be run on server side...should be part of expression service.

        validation() {
            // could have config.validation...
            //  - 'it>8'                single string
            //  - ['it>8', 'it<100']    array of strings
            //  - 'required'            reserved word (which is mapped to a string later)
            //  - ['required', 'it>6']  array of words,
            //  - { expr: 'it>8', msg: 'must be greater than 8' }      // validation object. uses "expr" property
            //  - { expr: 'it>8', msg: 'must be greater than 8', code:'CX8' }      // optional code/msg property
            //  - { expr: 'it>8', code:'CX8' }      //  this is useful for localization
            //  - [ { expr: 'it>8', msg: 'must be greater than 8' }, {'it<10', msg:'too big'  }  // array of above
            //  - ['required', {expr:'$.foo.length>6', code:-1}]   // mix and match.
            let input = Array.isArray(this.config.validation) ? this.config.validation : [this.config.validation]

            return input.reduce((a,v)=> {
                    let result = this.validate(v)
                    if (result) {
                        a.push(result)
                    }
                    return a
                }, [])

        },

        visible() {
            if (!this.config.visible) return true;
            return this.evaluate(this.config.visible)
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

        evaluate(expr) {
            return this.evaluationService.evaluate(expr, this.exprContext())
        },

        validate(expr) {
            return this.evaluationService.validate(expr, this.exprContext())
        },

        exprContext(value) {
            // get default context which contains useful macros from VUEX (it is set there at load time).

            // note that this SHOULD NOT be a computed property because it will not be called every time you do an evaluation.
            //   which is wrong, because it can involve expressions that outside of reactivity and MUST be called.
            //   e.g.   $now : "new Date()"     <--must be called at time of expression evaluation!!

            // in order to add new macro variable, you need to update module on client and server...hmmmm.
            //   if the definition is simple javascript then they can be expressions?
            //  config.customVars = {
            //    $today:"new Date()"
            //    $exchangeRate:"343",
            //    $broker: { client: 'bob' }
            //    $mediaType: { client: 'small' }
            //   }
            //   @@it's possible that some validations should only be done on the client side.

            // TODO : read this from VUEX.
            let immutableContextFromSettings = {
                $today: "new Date()",
                // $day:
                // $ms:
                // $year:
                // $month:
                // $nextBusinessDay:
                $me : "context.user.name",
            }

            // add pretty much everything in state store to context.
            // this makes it possible to have validation expressions like...
            //    context.user=="Joe" && settings.ignoreErrors==true
            //  the key point being they reference "context" and "settings" modules in their expression.
            // also define '$' which is root of all data.
            let context = {...immutableContextFromSettings, '$':"data.root"}

            let modules = this.$store.getters.modules
            this.$store.dispatch('test','foo')
            this.$store.dispatch('settings/test','foo')

            context = Object.keys(context)
                .reduce( (a,k)=> {
                    a[k]=this.evaluationService.evaluate(context[k], modules)
                    return a
            }, {})

            // after evaluating modules and predefined
            context['config'] = this.config
            context.it = value
            // i'm going to want to add parent here...
            // context['parent'] = this.$store.get('data/root@'+parent.join('.'))
            return context
        },

        emit(name,$event) {
            if (this.config.events) {
                let e = this.config.events[name]||name
                //currently only handles change events, but others can be added...blur/focus/key/mouse etc...
                this.$emit('wtw-event', {
                    name:name,
                    event: $event,
                    parent: this.parent,
                    source: this.config.bind,
                    config: this.config,
                    value: this.value
                })
            }
        },

    }
}

