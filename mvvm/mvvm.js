class Mvvm {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        if (this.$el) {
            new Compile(this.$el, this)
        }
    }
}

class Compile {
    constructor(el, vm) {
        this.el = this.isElement(el) ? el : document.querySelector(el)
        this.vm = vm
    }

    isElement(node) {
        return node.nodeType === 1
    }
}