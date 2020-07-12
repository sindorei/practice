import { 
    createElement,
    render,
    renderDom
 } from './vnode.js'

 import diff from './diff.js'

 let vnode = createElement('ul', { class: 'list' }, [
     createElement('li', { class: 'item'}, ['a']),
     createElement('li', { class: 'item'}, ['b']),
     createElement('li', { class: 'item'}, ['c']),
 ])

 let vnode2 = createElement('ul', { class: 'list2' }, [
    createElement('li', { class: 'item'}, ['a']),
    createElement('li', { class: 'item2'}, ['b']),
    createElement('li', { }, ['d', 'e']),
    createElement('li', { class: 'item2' }, ['f']),
])

let patch = diff(vnode, vnode2)

console.log(patch)