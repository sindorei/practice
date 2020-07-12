

const ATTRS = 'ATTRS'
const TYPES = {
    ATTRS: 'ATTRS',
    REMOVE: 'REMOVE',
    REPLACE: 'REPLACE',
    TEXT: 'TEXT',
}
let index = 0

function isString(val) {
    return typeof val === 'string'
}

function walk(oldNode, newNode, patches, index) {
    let currentPatch  = []
    if (!newNode) {
        currentPatch.push({
            type: TYPES.REMOVE,
            index
        })
    } else if (isString(oldNode) && isString(newNode)) {
        if (oldNode != newNode) {
            currentPatch.push({
                type: TYPES.TEXT,
                text: newNode
            })
        }
    } else if (oldNode.type === newNode.type) {
        let attrs = diffAttr(oldNode.props, newNode.props)
        if (Object.keys(attrs).length) {
            currentPatch.push({
                type: TYPES.ATTRS,
                attrs
            })
        }
        diffChildren(oldNode.children, newNode.children, patches)
    } else {
        currentPatch.push({
            type: TYPES.REPLACE,
            newNode
        })
    }
    if (currentPatch.length) {
        patches[index] = currentPatch
    }
    return patches
}

function diff(oldTree, newTree) {
    let patches = {}
    index = 0
    walk(oldTree, newTree, patches, index)
    return patches
}


function diffAttr(oldAttrs, newAttrs) {
    let patch = {}
    let newKeys = Object.keys(newAttrs)
    let oldKeys = Object.keys(oldAttrs)
    newKeys.forEach(key => {
        if (typeof oldAttrs[key] === 'undefined' || newAttrs[key] !== oldAttrs[key]) {
            patch[key] = newAttrs[key]
        }
    })
    oldKeys.forEach(key => {
        if (typeof newAttrs[key] === 'undefined') {
            patch[key] = newAttrs[key]
        }
    })

    return patch
}

function diffChildren(oldChildren, newChildren, patches) {
    oldChildren.forEach((child, idx) => {
        walk(child, newChildren[idx], patches, ++index)
    })
    // TODO 新增
}

export default diff