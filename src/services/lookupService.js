import axios from 'axios'


export default {

    // e.g. property = code, matchspec = 0, obj = {code: 12, ...}
    // e.g. property = code, matchspec = [0, 100, {min:2, max: 3]}, obj = {code: 12, ...}
    match(obj, property, matchSpec) {
        let value = obj[property]
        let result = undefined
        if (matchSpec.min || matchSpec.max) {
            let min = matchSpec.min || 0
            let max = matchSpec.max || Number.MAX_SAFE_INTEGER
            result = value >= min && value < max
        } else if (Array.isArray(matchSpec.value)) {
            // could be an array of values or a single value.
            result = value.reduce((a, c) => a || this.match(obj, property, c), false)
        } else {
            result = matchSpec == value
        }

        return matchSpec.not ? !result : result
    },


    // e.g. matches = { "code": 0, "http": [100, 200, 300], "foo" : { min:9, max:12 } }
    // possible that spec could be primitive, but it is typically array.
    // e.g.   matches(78, obj).    if you use a primitive spec it assumes that obj is also a primitive.
    matches(matchSpecs, obj) {
        if (!matchSpecs || matchSpecs == '*') return true

        if (matchSpecs != Object(matchSpecs)) {
            return matchSpecs==obj
        } else {
            return Object.entries(matchSpecs).reduce((acc, [property, spec]) =>
                this.match(obj, property, spec), false)
        }
    },

    lookup({value, table}) {

        let match = table.find(t => {
            return this.matches(t.matches, value)
        })

        if (!match) {
            // deal with catchall. navigate to error page.
            // return { path: 'error', reason:'no match for '+resp}
        }
        return match.result
    }

}




