class VNode {
    constructor(type, props, children) {
        this.type = type
        this.props = props
        this.children = children
    }
}

function createElement(type, props, children) {
    return new VNode(type, props, children)
}

function render(vnode) {
    let el = document.createElement(vnode.type)
    let attrs = Object.keys(vnode.props)
    attrs.forEach(attr => setAttr(el, attr, vnode.props[attr]))
    vnode.children.forEach(child => {
        child  = (child instanceof VNode) ? render(child) : document.createTextNode(child)
        el.appendChild(child)
    })
    return el
}

function setAttr(node, key, value) {
    switch(key) {
        case 'value':
            if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTEARE') {
                node.value = value
            } else {
                node.setAttribute(key, value)
            }
            break
        case 'style':
            node.style.cssText = value
            break
        default:
            node.setAttribute(key, value)
    }
}

function renderDom(el, target) {
    target.appendChild(el)
}

export {
    createElement,
    render,
    VNode,
    renderDom
}