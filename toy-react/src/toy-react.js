class ElementWrapper {
    constructor(type) {
        this.type = type
        this.props = Object.create(null)
        this.children = []
    }
    setAttribute(key, val) {
        this.props[key] = val
    }
    appendChild(vchild) {
        this.children.push(vchild)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }
}
class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

export class Component {
    constructor() {
        this.children = []
        this.props = Object.create(null)
    }
    setAttribute(name, value) {
        this[name] = value
        this.props[name] = value
    }
    mountTo(parent) {
        let vdom = this.render()
        vdom.mountTo(parent)
    }
    appendChild(vChild) {
        this.children.push(vChild)
    }
    setState(state) {
        let merge = (oldState, newState) => {
            for(let p in newState) {
                if (typeof newState[p] === 'object') {
                    if(typeof oldState[p] !== 'object') {
                        oldState[p] = {}
                    }
                    merge(oldState[p], newState[p])
                } else {
                    oldState[p] = newState[p]
                }
            }
        }
        if (!this.state && state) {
            this.state = {}
        }
        merge(this.state, state)
    }
}

export let ToyReact = {
    createElement(type, attributes, ...children) {
        let element
        if (typeof type === 'string') {
            element = new ElementWrapper(type)
        } else {
            element = new type
        }
        for(let attr in attributes) {
            element.setAttribute(attr, attributes[attr])
        }
        const insertChild = children => {
            for(let child of children) {
                if(Array.isArray(child)) {
                    insertChild(child)
                } else {
                    if (child == null) {
                        child = ''
                    }
                    if(!(child instanceof Component) &&
                        !(child instanceof ElementWrapper) &&
                        !(child instanceof TextWrapper)
                        ) {
                            child = String(child)
                        }
                    if(typeof child === 'string') {
                        child = new TextWrapper(child)
                    }
                    element.appendChild(child)
                }
            }
        }
        insertChild(children)
        return element
    },
    render(vdom, element) {
        vdom.mountTo(element)
    }
}