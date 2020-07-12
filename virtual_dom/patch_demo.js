import { 
    createElement,
    render,
    renderDom
 } from './vnode.js'

 import diff from './diff.js'

 import patch from './patch.js'

 let vnode = createElement('ul', { class: 'list' }, [
     createElement('li', { class: 'item'}, ['a']),
     createElement('li', { class: 'item'}, ['b']),
     createElement('li', { class: 'item'}, ['c']),
 ])

 let el = render(vnode)

 renderDom(el, document.body)

 let vnode2 = createElement('ul', { class: 'list2' }, [
    createElement('li', { class: 'item'}, ['a']),
    createElement('li', { class: 'item2'}, ['b']),
    createElement('li', { class: 'item3' }, ['d']),
])

let patches = diff(vnode, vnode2)

patch(el, patches)