
import {get, set} from 'vuex-pathify';
import evaluationService from "../services/evaluationService";


export default {
    props: ['config', 'value'],
    inject:['evaluationService'],
    components: {},

    data: function() {
        return {
        }
    },

    computed: {

        rules() {
            return this.config.validation ? [
                this.evaluationService.ruleFor(this.config.validation, this.exprContext)] : []
        },

        items() {
            // if empty... $store.dispatch('lists/${config.items.key})
            // return get('lists/...' )
        },

        visible() {
            if (!this.config.visible) return true;
            return this.evaluate(this.config.visible)
        },

        width() {
            // TODO : add ability to handle platform.
            // e.g. return config.mobile.width||config.width
            return this.config.width
        },

    },

    created() {
    },

    /* section: client
            section: info
                section: address:1
                    widget: city


sections have NO parent, just bind.
only top level form has parent...but really, that's just bind.

    textfield =>input.native
    ConfComp::TextField =>wtw-input {'Toronto', ['city']}                   [...path, bind]
    ConfSection::Address => wtw-input {'Toronto', ['address','1','city]     [bind,{index},...path]                  path='city'
    ConfSection::INFO => wtw-input {'Toronto', ['info','address','city]     [bind, ...path]                         path=address,1,city
    ConfSection::CLient => wtw-input {'Toronto', ['client','address','city] [bind, ...path]                         path=info,address,1,city
     */
    methods: {
        emitInput($event) {
            this.$emit('wtw-input', {value:$event, path:[this.config.bind]})
        },

        evaluate(expr) {
            return this.evaluationService.evaluate(expr, this.exprContext())
        },

        // should put this in evaluationContextService?  not in mixin.

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

            // TODO : read this from VUEX.  hard coded here now as POC
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
        }

    }
}

