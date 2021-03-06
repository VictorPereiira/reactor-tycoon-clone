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
                    <div class="elementContainer" onclick="resources('access', 'element').toOnElement(${idElement}, ${idMap})">
                        ${element.img}
                    </div>
                `
            }
        },

        menu: () => {
            document.querySelector('.menu').innerHTML = `
                <div class="menu_container">
                   <div class="menu_element hammer">๐จ</div>
                   <div class="menu_element upgrade">๐</div>
                   <div class="menu_element search">๐งช</div>
                   <div class="menu_element delete">โ</div>
                   <div class="menu_element help">โ</div>
                   <div class="menu_element stats">๐งฎ</div>
                   <div class="menu_element settings">๐ก</div>
                </div>
            `

            resources('toDOM', 'menuItens')
        },

        mold: (title) => {
            document.querySelector('.mold').innerHTML = `
                    <section class="mold_container" >
                    <header class="mold_header">
                        <button class="close">Close</button>
                        <h2>${title}</h2>
                        <button class="energyForCash">โก -> ๐ธ</button>
                    </header>
                    <main class="mold_content"></main>
                </section >
    `

            document.querySelector('.menu_button').style.display = 'none'
            document.querySelector('.convertButton').style.display = 'none'
            document.querySelector('.menu').innerHTML = ' '

            document.querySelector('.mold .energyForCash').addEventListener('click', () => {
                resources('access', 'actions').convertToCash()
            })

            document.querySelector('.mold .close').addEventListener('click', () => {
                document.querySelector('.mold').innerHTML = ' '
                document.querySelector('.menu_button').style.display = 'inline'
                document.querySelector('.convertButton').style.display = 'inline'
            })
        },

        build: () => {
            draw().mold('BUILD')
            resources('access', 'build')
        }
    }
}
