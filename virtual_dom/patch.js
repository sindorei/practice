import { VNode, render } from "./vnode.js"

let index = 0
function walk(node, patches) {
    let curPatch = patches[index++]
    let childNodes = node.childNodes
    childNodes.forEach(child => {
        walk(child, patches)
    })
    if (curPatch) {
        doPatch(node , curPatch)
    }
}

function doPatch(node, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case 'ATTRS':
                break
            case 'REPLACE':
                let newNode = (patch.newNode instanceof VNode) ?
                    render(node) : document.createTextNode(node)

                node.parentNode.replaceChild(newNode, node)
                break
            case 'REMOVE':
                break

            case 'TEXT':
                node.textContent = patch.text
                break
        }
    })
}

export default function patch(node, patches) {
    index = 0
    walk(node, patches)
}