import initGame from './initGame.js'
import draw from './draw.js'
import createMaps from './constructors/maps.js'
import build from './constructors/build.js'
import createElement from './element.js'
import actions from './actions.js'

export default function resources(func, method) {
    const access = (resq) => {
        if (resq === 'initGame') return initGame()
        if (resq === 'draw') return draw()
        if (resq === 'createMaps') return createMaps()
        if (resq === 'build') return build()
        if (resq === 'element') return createElement()
        if (resq === 'actions') return actions()
    }

    const toDOM = (docAccess) => {
        if (docAccess === 'menu') return document.querySelector('.menu_button')
            .addEventListener('click', () => {
                access('draw').menu()
            })

        if (docAccess === 'convertToCash') return document.querySelector('.convertButton')
            .addEventListener('click', () => {
                access('actions').convertToCash()
            })

        if (docAccess === 'menuItens') {
            document.querySelector('.menu .hammer').addEventListener('click', () => {
                access('draw').build()
            })
        }
    }

    if (func === 'access') return access(method)
    if (func === 'toDOM') return toDOM(method)
}


