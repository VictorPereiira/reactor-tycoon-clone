import resources from './resources.js';

export default function draw() {
    return {
        map: () => {
            document.querySelector('.map').innerHTML = ' '

            let currentMap = JSON.parse(localStorage.mapOn),
                buildingSite = currentMap.building_site

            for (let i in buildingSite) {
                let element = buildingSite[i],
                    nameElement = element.name,
                    idElement = element.id,
                    idMap = i

                buildingSite[i].idMap = idMap
                localStorage.mapOn = JSON.stringify(currentMap)

                document.querySelector('.map').innerHTML += `
                    <div class="elementContainer" onclick='access("element").toOnElement(${idElement}, ${idMap})'>
                        <div>${nameElement}</div>
                        <div>${idMap}</div>
                    </div>
                `
            }
        },

        menu: () => {
            document.querySelector('.menu').innerHTML = `
                <div class="menu_container">
                   <div class="menu_element hammer">🔨</div>
                   <div class="menu_element upgrade">🔝</div>
                   <div class="menu_element search">🧪</div>
                   <div class="menu_element delete">❌</div>
                   <div class="menu_element help">❔</div>
                   <div class="menu_element stats">🧮</div>
                   <div class="menu_element settings">🎡</div>
                </div>
            `

            document.querySelector('.menu .hammer').addEventListener('click', () => {
                draw().build()
            })
        },

        mold: (title) => {
            document.querySelector('.mold').innerHTML = `
                    <section class="mold_container" >
                    <header class="mold_header">
                        <button class="close">Close</button>
                        <h2>${title}</h2>
                        <button>⚡ -> 💸</button>
                    </header>
                    <main class="mold_content"></main>
                </section >
    `

            document.querySelector('.menu_button').style.display = 'none'
            document.querySelector('.convertButton').style.display = 'none'
            document.querySelector('.menu').innerHTML = ' '

            document.querySelector('.mold .close').addEventListener('click', () => {
                document.querySelector('.mold').innerHTML = ' '
                document.querySelector('.menu_button').style.display = 'inline'
                document.querySelector('.convertButton').style.display = 'inline'
            })
        },

        build: () => {
            resources('access', 'draw').mold('BUILD')
            document.querySelector('.mold .mold_content').innerHTML = `
                <div class="build_element_container" id="0">
                    ⛲
                    <h3>WIND TURBINE</h3>
                    <div>
                        <span>1</span>
                        💲
                    </div>
                    <p>PRODUCES 1.00 POWER</p>
                    <small>LIFETIME: 5</small>
                </div >
            `

            document.querySelector('.mold .mold_content .build_element_container ').addEventListener('click', e => {
                let pathId,
                    idEl

                for (let i in e.path) {
                    pathId = Number(e.path[i].id)
                    if (pathId >= 0) idEl = pathId
                }

                resources('access', 'actions').buy(idEl)
                document.querySelector('.mold').innerHTML = ' '
                document.querySelector('.menu_button').style.display = 'inline'
                document.querySelector('.convertButton').style.display = 'inline'
            })
        }
    }
}
