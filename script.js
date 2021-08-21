const initGame = () => {
    if (localStorage.getItem('energy') === null) {
        let map = [
            {
                'size': 10,
                'trees': 2,
                'mountains': 2,
                'building_site': [
                    {
                        'id': 0,
                        'idMap': 0,
                        'name': 'Wind Turbine',
                        'elementStatus': 'off'
                    },
                    {
                        'id': 0,
                        'idMap': 0,
                        'name': 'Wind Turbine',
                        'elementStatus': 'off'
                    }
                ],
                'state': 'open',
                'value_island': 0
            }
        ]

        localStorage.setItem('energy', 0)
        localStorage.setItem('energyCapacity', 200)
        localStorage.setItem('cash', 0)
        localStorage.setItem('mapOn', JSON.stringify(map[0]))

        console.log('initGame... with config start');
    } else {
        console.log('initGame... with config salved');
    }

    draw()
    document.querySelector('.energy').textContent = localStorage.energy
    document.querySelector('.cash').textContent = localStorage.cash

    document.querySelector('.convertButton').addEventListener('click', () => {
        access("actions").converterEnergyToCash()
    })
}

const draw = () => {
    console.log('draw...');
    console.log(' ');

    let currentMap = JSON.parse(localStorage.mapOn),
        buildingSite = currentMap.building_site

    for (let i in buildingSite) {
        let element = buildingSite[i],
            idElement = element.id,
            idMap = element.id + i,
            nameElement = element.name

        buildingSite[i].idMap = idMap
        localStorage.mapOn = JSON.stringify(currentMap)
        console.log(currentMap);

        document.querySelector('.map').innerHTML += `
                    <div class="elementContainer" onclick='access("element").toOnElement(${idElement}, ${idMap})'>
                        <div>${nameElement}</div>
                        <div>${idMap}</div>
                    </div>
                    `
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
        toOnElement: (id, idMap) => {
            console.log('toOnElement...')
            console.log(' ')

            idMap = Math.floor(Number(idMap))
            console.log(idMap);

            let currentMap = JSON.parse(localStorage.mapOn),
                element = currentMap.building_site[idMap]


            if (element.elementStatus === "on") {
                localStorage.mapOn = JSON.stringify(currentMap)
                return console.log('This element is work 🛠')
                console.log(' ');
            } else {
                console.log('tuOn: ' + idMap + ' element');
                element.elementStatus = "on"
                localStorage.mapOn = JSON.stringify(currentMap)
            }

            let lifeTimeElement = box[id].lifeTime,
                energyCapacity = localStorage.energyCapacity,
                cpt = setInterval(function () {
                    let energyValue = localStorage.energy

                    if (energyValue === energyCapacity) {
                        return console.log('You reached the maximum energyCapacity ⚠');
                    }

                    energyValue++
                    lifeTimeElement--
                    localStorage.energy = energyValue
                    document.querySelector('.energy').textContent = energyValue

                    if (lifeTimeElement < 1) {
                        console.log('element: ' + idMap + ' is finished');
                        console.log(' ');

                        clearInterval(cpt)
                        element.elementStatus = 'off'
                        lifeTimeElement = box[id].lifeTime
                        localStorage.mapOn = JSON.stringify(currentMap)
                        access("element").toOnElement(id, idMap)

                        // autoOnElement
                        // this.component[0].LifeTime = 5
                        // reactor_tycoon.toOnComponent()
                    }
                }, 1000)
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
                cashValue = Number(localStorage.cash)

            if (energyValue < 1) return console.log('You not have energy! ⚡')
            cashValue += energyValue
            energyValue = 0

            localStorage.cash = cashValue
            localStorage.energy = energyValue
            document.querySelector('.cash').textContent = cashValue
            document.querySelector('.energy').textContent = energyValue
        }
    }
}


const access = (resq) => {
    console.log('access...');

    if (resq === 'initGame') return initGame()
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