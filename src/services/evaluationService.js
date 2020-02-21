
// evaluation service....keep this file uncouple from any Vue objects.  it must
//  be able to run on server side too.
import store from "../store/store";

export default {

    // TODO : what if the validations need access to lists.  we have to be able to synchronize.  somehow return a promise
    // and finish evaluation later.   or make a method  await $.list('manufacturers') that checks VUEX and dispatches action if data not there

    // TODO : needs to handle reserved words like 'required', 'email', 'phone', etc...
    reservedKeywords : {
        required: "!!it",
    },

    // this would be read in from config file.
    configurableFunctions: {
        // TODO : when handling basic functions, go over these.  turn them in to functions (just the once)
        //  and add them to the list.  should check for duplicates when doing so.
      isEmail : "/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(it)"
    },

    basicFunctions: {
        sum: (x,y) => x*1 + y*1,
        max: (...v) => [...v].reduce((a,b)=>Math.max(a,b),0)
    },

    getContext(value) {
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
//    let immutableContextFromSettings = get('settings/evalContext')...
        let immutableContextFromSettings = {
            $today: "new Date()",
            // $day:
            // $ms:
            // $year:
            // $month:
            // $nextBusinessDay:
            $me: "context.user.name",
        }

        // add pretty much everything in state store to context.
        // this makes it possible to have validation expressions like...
        //    context.user=="Joe" && settings.ignoreErrors==true
        //  the key point being they reference "context" and "settings" modules in their expression.
        // also define '$' which is root of all data.
        let context = {...immutableContextFromSettings, '$': "data.root"}

        let modules = store.getters.modules

        let that = this
        context = Object.keys(context)
            .reduce((a, k) => {
                a[k] = that.evaluate(context[k], modules)
                return a
            }, {})

        // after evaluating modules and predefined
        context['config'] = this.config
        context.it = value
        // i'm going to want to add parent here...
        // context['parent'] = store.get('data/root@'+parent.join('.'))
        return context
    },

    // note the difference between "validating" and simply evaluating and expression.
    // a validation is an expression, that if it evaluates to false, is treated as an error and returns a error object.
    //  i.e. if "it>8" returns false, will return "error should be > 8".
    // if you simply call evaluate, it will return the boolean (false in this case).
    // vuetify "rules" are required to return strings which is what is done in "ruleFor"
    evaluate(expression, context={}) {
        try {
            if (!expression) return
            context['$'] = {...this.basicFunctions, ...context['$']}
            // check for keywords and do substitutions.
            let fn = new Function(Object.keys(context), 'return ' + expression)
            return fn(...Object.values(context))
        }
        catch (e) {
            console.log('cant evaluate expression ' + JSON.stringify(expression))
            console.log(e)
            console.log(' Keeping calm, returning true (so it wont fail) and carrying on.')
            return true
        }
    },

    ruleFor(validation, contextFactory=this.getContext) {
        let that = this
        return (v) => {
            let context = contextFactory.apply(that,[v])
            let result = this.validate(validation, context)
            return result.length>0 ?
                result.map(v=>v.msg||v.code||v.validation).join('  ') :
                true
        }
    },


    // keywords : {
    //    required: "!!it"
    //    email: it.match(someRegexp)
    //    phone: it.match(anotherRegexp)
    //    money: it>=0 && less than 2 digits??

    validate(validation, context) {
        let input = Array.isArray(validation) ? validation : [validation]
        return input.reduce((a,v)=> {
            let result = this.validateInstance(v, context)
            if (result) {
                a.push(result)
            }
            return a
        }, [])
    },

    validateInstance(validation, context) {

        // TODO : need to filter out server side only validations.
        // TODO : need to replace keywords macros with their function.  e.g. 'required' -> '!!it'

        // remove unused covers SAR.   new trade table.

        // validation can be an object or a expression string or it can be an array of either.  (array is AND'd)
        //
        // e.g. validation: {
        //    expr: 'it>5'
        //    code: -1,
        //    msg: 'an error occurred'
        //    trim: true,
        //    case: upper|lower|ignore|respect,
        //   }
        // or validation = 'it.length>3'
        // or validation = ['it>9','sum($.foo,it)==100', ['apple','banana','pear'].contains(it))]
        // or validation - { expr:"it>5" , mode:"client|server|both"

        let details =  context
        let result = undefined

        // need to put this aspect somewhere else.   also, how will the code know if it's run on the server or not?
        // should be something like if (modeSupported(validation.mode))....
        if (validation.mode=='server') return

        let expr = (validation.expr||validation)
        expr = this.reservedKeywords[expr.trim()] || expr

        if (!this.evaluate(expr, context)) {
            return {
                validation:expr,
                msg: validation.msg||'expression is not satisfied ' +  validation,
                code:validation.code||-1,
                details
            }
        }
        return false
        // TODO : should evaluate expressions because message could be... ' ${config.label} must be greater than 5 but was ${it}'
        // result.msg.replace("//g ${??}", evaluate({??}, context} )
    },


}
