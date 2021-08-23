const initGame = () => {
    if (localStorage.getItem('energy') === null) {
        let map = [
            {
                'size': 70,
                'free_place': 48,
                'trees': [
                    {
                        'id': 0,
                        'destruct_value': 4
                    }
                ],
                'mountains': [
                    {
                        'id': 0,
                        'destruct_value': 4
                    }
                ],
                'building_site': [],
                'state': 'open',
                'value_island': 0
            }
        ]

        localStorage.setItem('energy', 0)
        localStorage.setItem('energyCapacity', 200)
        localStorage.setItem('cash', 1)
        localStorage.setItem('mapOn', JSON.stringify(map[0]))

        console.log('initGame... with config start');
    } else {
        console.log('initGame... with config salved');
    }

    access("draw").map()
    access("element").callToAllElements()
    document.querySelector('.energy').textContent = localStorage.energy
    document.querySelector('.cash').textContent = localStorage.cash

    document.querySelector('.menu_button').addEventListener('click', () => {
        access("draw").menu()
    })

    document.querySelector('.convertButton').addEventListener('click', () => {
        access("actions").converterEnergyToCash()
    })
}

const draw = () => {
    console.log('draw...');
    console.log(' ');

    return {
        map: () => {
            console.log('drawing map...');
            document.querySelector('.map').innerHTML = ' '

            let currentMap = JSON.parse(localStorage.mapOn),
                buildingSite = currentMap.building_site

            for (let i in buildingSite) {
                let element = buildingSite[i],
                    idElement = element.id,
                    idMap = element.id + i,
                    nameElement = element.name

                buildingSite[i].idMap = idMap
                localStorage.mapOn = JSON.stringify(currentMap)

                document.querySelector('.map').innerHTML += `
                    <div class="elementContainer" onclick='access("element").toOnElement{idElement}, ${idMap})'>
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

            document.querySelector('.menu_button').addEventListener('click', () => {
                access("draw").menu()
            })

            document.querySelector('.menu .hammer').addEventListener('click', () => {
                access("draw").build()
            })
        },

        mold: (title) => {
            document.querySelector('.mold').innerHTML = `
                <section class="mold_container">
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
                <div class="build_element_container" onclick='access("actions").buy(0, 1)'>
                    ⛲
                    <h3>WIND TURBINE</h3>
                    <div>
                        <span>1</span>
                        💲
                    </div>
                    <p>PRODUCES 1.00 POWER</p>
                    <small>LIFETIME: 5</small>
                </div>
            `

            document.querySelector('.mold .mold_content .build_element_container ').addEventListener('click', () => {
                document.querySelector('.mold').innerHTML = ' '
                document.querySelector('.menu_button').style.display = 'inline'
                document.querySelector('.convertButton').style.display = 'inline'
            })
        }
    }
}

const createElement = () => {
    console.log('creatElement...');

    let box = [
        {
            'id': 0,
            'idMap': 0,
            'name': 'Wind Turbine',
            'unitValue': 1,
            'production': 1,
            'lifeTime': 5,
            'elementStatus': 'off'
        }
    ]

    return {
        box: (id) => {
            return box[id]
        },

        toOnElement: (id, idMap) => {
            console.log('toOnElement...')
            console.log(' ')

            idMap = Math.floor(Number(idMap))

            let currentMap = JSON.parse(localStorage.mapOn),
                element = currentMap.building_site[idMap]


            if (element.elementStatus === "on") {
                localStorage.mapOn = JSON.stringify(currentMap)
                return console.log('This element is work 🛠')

            } else {
                console.log('tuOn: ' + idMap + ' element');
                element.elementStatus = "on"
                localStorage.mapOn = JSON.stringify(currentMap)
            }

            let lifeTimeElement = box[id].lifeTime,
                energyCapacity = localStorage.energyCapacity

            const cpt = setInterval(() => {
                let energyValue = localStorage.energy

                if (energyValue === energyCapacity) {
                    clearInterval(cpt)
                    return console.log('You reached the maximum energyCapacity ⚠');
                }

                energyValue++
                lifeTimeElement--
                localStorage.energy = energyValue
                document.querySelector('.energy').textContent = energyValue

                if (lifeTimeElement < 1) {
                    console.log('element: ' + idMap + ' is finished');
                    console.log(' ');

                    element.elementStatus = 'off'
                    localStorage.setItem('mapOn', JSON.stringify(currentMap))
                    clearInterval(cpt)
                    access("element").toOnElement(id, idMap)
                }
            }, 1000)
        },

        callToAllElements: () => {
            console.log('callToAllElements...')
            let currentMap = JSON.parse(localStorage.mapOn)

            for (let i in currentMap.building_site) {
                let element = currentMap.building_site[i],
                    idEl = element.id


                element.elementStatus = 'off'
                localStorage.mapOn = JSON.stringify(currentMap)
                access("element").toOnElement(idEl, i)
            }
            console.log(' ')
        }
    }
}

const actions = () => {
    console.log('actions...');

    return {
        converterEnergyToCash: () => {
            console.log('converter cash...');
            console.log(' ')

            let energyValue = Number(localStorage.energy),
                energyCapacity = Number(localStorage.energyCapacity),
                cashValue = Number(localStorage.cash)


            if (energyValue < 1) return console.log('You not have energy! ⚡')
            if (energyValue === energyCapacity) access("element").callToAllElements()
            cashValue += energyValue
            energyValue = 0


            localStorage.cash = cashValue
            localStorage.energy = energyValue
            document.querySelector('.cash').textContent = cashValue
            document.querySelector('.energy').textContent = energyValue
        },

        buy: (id, quantity) => {
            console.log('buy...')
            console.log(' ')



            let elementBuy = access("element").box(id),
                cashValue = localStorage.cash,
                valueBuy = elementBuy.unitValue * quantity


            if (cashValue >= valueBuy) {
                console.log('buying...')
                console.log(' ');

                cashValue -= valueBuy
                localStorage.cash = cashValue
                document.querySelector('.cash').textContent = cashValue


                access("actions").putOnTheMap(elementBuy, quantity)
            }
            else console.log('You not have cash! 😞')
        },

        putOnTheMap(elementBuy, quantity) {
            console.log('putOnTheMap...');
            console.log(' ');

            let currentMap = JSON.parse(localStorage.mapOn),
                building_site = currentMap.building_site,
                count = 0

            while (count < quantity) {
                building_site.push(elementBuy)
                quantity--
            }

            localStorage.mapOn = JSON.stringify(currentMap)
            access("draw").map()
            access("element").callToAllElements()
        }
    }
}

const access = (resq) => {
    console.log('access...');

    if (resq === 'initGame') return initGame()
    if (resq === 'draw') return draw()
    if (resq === 'element') return createElement()
    if (resq === 'actions') return actions()
}


// Admin Functions 
// addElement(imgEL, nameEL, unitValueEL, productionEL, lifeTimeEl, levelEL = 1) {
//     if (typeof (imgEl) !== string) return
//     if (typeof (nameEl) !== string) return

//     let newElement = {
//         'Img': imgEL,
//         'Name': nameEL,
//         'UnitValue': unitValueEL,
//         'Production': productionEL,
//         'LifeTime': lifeTimeEl,
//         'level': levelEL
//     }
//     this.box.dataShopping.push(newElement)
// }

