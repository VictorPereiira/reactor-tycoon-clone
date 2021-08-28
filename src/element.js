import resources from './resources.js'

export default function Element() {

    return {
        getBox: (parm) => {
            if (parm === 'all') return box
            else return box[parm]
        },

        toOnElement: (id, idMap) => {
            idMap = Math.floor(Number(idMap))

            let energyValue = Number(localStorage.energy),
                energyCapacity = Number(localStorage.energyCapacity),
                currentMap = JSON.parse(localStorage.mapOn),
                element = Element().getBox(0),
                lifeTime = element.lifeTime

            if (element.elementStatus === 'on') return console.log('This element is work 🛠')
            else {
                element.elementStatus = 'on'
                localStorage.mapOn = JSON.stringify(currentMap)
            }

            const cpt = setInterval(() => {
                if (energyValue === energyCapacity) {
                    clearInterval(cpt)
                    return console.log('You reached the maximum energyCapacity ⚠');
                }

                // energyValue += Number(element.production * element.lifeTime)
                energyValue++
                lifeTime--
                localStorage.energy = energyValue
                document.querySelector('.energy').textContent = energyValue

                if (lifeTime < 0) {
                    element.elementStatus = 'off'
                    clearInterval(cpt)
                    Element().toOnElement(id, idMap)
                }

            }, 1000) //  element.lifeTime * 1000
        },

        callToAllElements: () => {
            let currentMap = JSON.parse(localStorage.mapOn)

            for (let i in currentMap.building_site) {
                let element = currentMap.building_site[i],
                    idEl = element.id


                element.elementStatus = 'off'
                localStorage.mapOn = JSON.stringify(currentMap)
                Element().toOnElement(idEl, i)
            }
        }
    }
}

function createBox(dataElements) {
    let dataBox = []

    for (let i in dataElements) {
        let dataEl = dataElements[i]

        dataBox.push({
            'id': i,
            'idMap': 0,
            'name': dataEl[0],
            'group': dataEl[1],
            'unitValue': dataEl[2],
            'production': { 'lv': 0, 'value': dataEl[3] },
            'lifeTime': { 'lv': 0, 'value': dataEl[4] },
            'update': 'off',
            'elementStatus': 'off',
            'img': dataEl[5]
        })
    }

    return dataBox
}

let dataElements = [
    ['Wind Turbine', 'Heaters', 1, 1, 5, '<img src="../public/wind-turbine.svg">'],
    ['Solar Painel', 'Heaters', 200, 10, 30, '<img src="../public/CloseIcon.svg">']
    // [nameEl, groupEl, unitValueEL, productionEL, lifeTimeEl, imgEl]
]

let box = createBox(dataElements)
