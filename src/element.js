import access from './resources.js'

export default function createElement() {
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
            idMap = Math.floor(Number(idMap))

            let energyValue = Number(localStorage.energy),
                energyCapacity = Number(localStorage.energyCapacity,)
            currentMap = JSON.parse(localStorage.mapOn),
                element = currentMap.building_site[idMap]

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

                element.elementStatus = 'off'
                energyValue += Number(element.production * element.lifeTime)
                localStorage.energy = energyValue
                document.querySelector('.energy').textContent = energyValue
                localStorage.setItem('mapOn', JSON.stringify(currentMap))
                clearInterval(cpt)
                access("element").toOnElement(id, idMap)

            }, element.lifeTime * 1000)
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