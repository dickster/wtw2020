
// evaluation service....keep this file uncouple from any Vue objects.  it must
//  be able to run on server side too.
export default {

    // TODO : needs to handle reserved words like 'required', 'email', 'phone', etc...

    // keywords : {
    //    required: "!!it""
    //    email: it.match(someRegexp)
    //    phone: it.match(anotherRegexp)
    //    money: it>=0 && less than 2 digits??

    evaluate(expression, context={}) {
        try {
            //TODO : need to add custom functions to the context here.
            // context.sum = (x,y)=>x+y  etc...
            // could add configurable functions.
            if (!expression) return
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

    validate(validation, context) {

        // TODO : need to filter out server side only validations.
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
        if (validation.expr) {
            result = !this.evaluate(validation.expr, context)
                            && {...validation, details }
        }
        else {
            result = !this.evaluate(validation, context) &&
                { code: -1, msg: 'expression is not satisfied ' +  validation , details:details }
        }
        // TODO : should evaluate expressions because message could be... ' ${config.label} must be greater than 5 but was ${it}'
        // result.msg.replace("//g ${??}", evaluate({??}, context} )
        return result
    }

}
