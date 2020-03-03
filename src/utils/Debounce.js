export default class Debounce {

    timer = null

    constructor(method, delay) {
        this.delay = delay
        this.method = method
    }

    trigger() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(this._invoke, this.delay)
    }

    _invoke() {
        this.method()
        clearTimeout(this.timer)
        this.timer = null
    }

}
