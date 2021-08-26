import access from './resources.js'

export default function draw() {
    console.log('draw...');

    return {
        map: () => {
            console.log('drawing map...');
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
                access("draw").build()
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
            console.log('drawing build...')
            console.log(' ')

            access("draw").mold('BUILD')
            document.querySelector('.mold .mold_content').innerHTML = `
                <div class="build_element_container" onclick = 'access("actions").buy(0, 1)' >
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

            document.querySelector('.mold .mold_content .build_element_container ').addEventListener('click', () => {
                document.querySelector('.mold').innerHTML = ' '
                document.querySelector('.menu_button').style.display = 'inline'
                document.querySelector('.convertButton').style.display = 'inline'
            })
        }
    }
}
