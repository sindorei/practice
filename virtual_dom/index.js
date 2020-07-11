import { 
    createElement,
    render,
    renderDom
 } from './vnode.js'

 let vnode = createElement('ul', { class: 'list' }, [
     createElement('li', { class: 'item'}, ['a']),
     createElement('li', { class: 'item'}, ['b']),
     createElement('li', { class: 'item'}, ['c']),
 ])

 let el = render(vnode)
 renderDom(el, document.body)

 console.log(vnode)