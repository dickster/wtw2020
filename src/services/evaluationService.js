
// evaluation service....keep this file uncouple from any Vue objects.  it must
//  be able to run on server side too.
export default {

    evaluate(expression, context={}) {
        try {
            if (!expression) return
            let fn = new Function(Object.keys(context), 'return ' + expression)
            return fn(...Object.values(context))
        }
        catch (e) {
            console.log('cant evaluate expression ' + expression)
            console.log(e)
            console.log(' Keeping calm, returning [undefined] and carrying on.')
            return
        }
    }

}
