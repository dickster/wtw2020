
// evaluation service....keep this file uncouple from any Vue objects.  it must
//  be able to run on server side too.
export default {

    // TODO : needs to handle reserved words like 'required', 'email', 'phone', etc...
    reservedKeywords : {
        required: "!!it",
    },

    // this would be read in from config file.
    configurableFunctions: {
        // TODO : when handling basic functions, go over these.  turn them in to functions (just the once)
        //  and add them to the list.  should check for duplicates when doing so.
      isEmail : "true"
    },

    basicFunctions: {
        sum: (x,y) => x*1 + y*1,
        max: (...v) => [...v].reduce((a,b)=>Math.max(a,b),0)
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

    ruleFor(validation, contextFactory=()=>{}) {
        return (v) => {
            let context = contextFactory(v)
            let result = this.validate(validation, context)
            return result.length>0 ?
                result.map(v=>v.msg||v.code||v.validation).join('  ') :
                true
        }
    },


    // keywords
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
        //
        // validation can be an object or a expression string or it can be an array of either.  (array is AND'd)
        //
        // e.g. validation: {
        //    expr: 'it>5'
        //    code: -1,
        //    msg: 'an error occurred'
        //    trim: true,
        //    case: upper|lower|ignore|respect,
        //   }
        //  or validation = 'it.length>3'
        // or validation = ['it>9','sum($.foo,it)==100', ['apple','banana','pear'].contains(it))]

        let details =  context
        let result = undefined
        let expr = this.reservedKeywords[(validation.expr||validation).trim()]|| expr
        let error = {
            validation:expr,
            msg: validation.msg||'expression is not satisfied ' +  validation,
            code:validation.code||-1,
            details
        }

        return !this.evaluate(validation, context) && error
        // TODO : should evaluate expressions because message could be... ' ${config.label} must be greater than 5 but was ${it}'
        // result.msg.replace("//g ${??}", evaluate({??}, context} )
    },


}
