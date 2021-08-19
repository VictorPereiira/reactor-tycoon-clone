reactor_tycoon = {

    controlPanel: {
        'cash': 1,
        'energyValue': 0,
        'energyCapacity': 200,
        'search': 0
    },

    map: [
        {
            'size': 10,
            'trees': 2,
            'mountains': 2,
            'building_site': [],
            'state': 'open',
            'value_island': 0
        }
    ],

    mapOn: [],

    shopping: {
        box: [
            {
                'id': 0,
                'name': 'Wind Turbine',
                'unitValue': 1,
                'production': 1,
                'lifeTime': 5,
                'elementStatus': 'off'
            }
        ],

        buy(id, quantity = 1) {
            let game = reactor_tycoon,
                elementBuy = this.box[id],
                cashAccess = game.controlPanel.cash,
                value = elementBuy.unitValue * quantity

            if (cashAccess >= value) {
                console.log('buying...')
                console.log(' ');

                cashAccess -= value
                game.controlPanel.cash -= value
                localStorage.cash = cashAccess

                this.putOnTheMap(elementBuy)
            } else console.log('You not have cash! 😞')
        },

        putOnTheMap(elementBuy) {
            console.log('putOnTheMap...');
            console.log(' ');

            let currentMap = JSON.parse(localStorage.mapOn),
                building_site = currentMap.building_site

            building_site.push(elementBuy)
            localStorage.mapOn = JSON.stringify(currentMap)
            reactor_tycoon.draw()
        }
    },

    cpt: [],

    element: {
        toOnElement(id) {
            let currentMap = JSON.parse(localStorage.mapOn),
                buildingSite = currentMap.building_site,
                element = buildingSite[id],
                lifeTimeElement = element.lifeTime

            if (element.elementStatus === "on") return console.log('This element work 🛠')
            element.elementStatus = 'on'
            localStorage.mapOn = JSON.stringify(currentMap)
            reactor_tycoon.cpt.push(id)

            console.log('tuOn: ' + id + ' element');

            let cptElement = setInterval(() => {
                console.log('continue');
                if (reactor_tycoon.cpt === true) return
                let energyValue = localStorage.energyValue,
                    energyCapacity = localStorage.energyCapacity

                if (energyValue === energyCapacity) return console.log('You reached the maximum energyCapacity ⚠');

                energyValue++
                lifeTimeElement--
                localStorage.energyValue = energyValue
                document.querySelector('.energy').textContent = energyValue

                if (lifeTimeElement < 1) {
                    clearInterval(cptElement)
                    element.elementStatus = 'off'
                    localStorage.mapOn = JSON.stringify(currentMap)

                    // autoOnElement
                    // this.component[0].LifeTime = 5
                    // reactor_tycoon.toOnComponent()
                }
            }, 1000)
        },
    },

    actions: {
        converterEnergyToCash() {
            let energyValue = Number(localStorage.energyValue),
                cash = Number(localStorage.cash)

            if (energyValue < 1) return console.log('You not have energy! ⚡')
            cash += energyValue
            energyValue = 0

            localStorage.cash = cash
            localStorage.energyValue = energyValue
            document.querySelector('.cash').textContent = cash
            document.querySelector('.energy').textContent = energyValue
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
    },

    // Game functions
    initGame() {
        console.log('initGame...')

        if (localStorage.getItem('cash') === null) {
            localStorage.setItem('cash', this.controlPanel.cash)
            localStorage.setItem('mapOn', JSON.stringify(this.map[0]))
            localStorage.setItem('energyValue', this.controlPanel.energyValue)
            localStorage.setItem('energyCapacity', this.controlPanel.energyCapacity)

            console.log('put start configs...');
        } else {
            this.controlPanel.cash = Number(localStorage.cash)
            this.mapOn = JSON.parse(localStorage.mapOn)
            this.controlPanel.energyValue = Number(localStorage.energyValue)
            this.controlPanel.energyCapacity = Number(localStorage.energyCapacity)

            document.querySelector('.cash').textContent = localStorage.cash
            document.querySelector('.energy').textContent = localStorage.energyValue
            console.log('get configs data...');
        }

        console.log(' ');
    },

    draw() {
        let currentMap = JSON.parse(localStorage.mapOn),
            buildingSite = currentMap.building_site

        for (let i in buildingSite) {
            let idElement = buildingSite[i].id + i,
                nameElement = buildingSite[i].name

            document.querySelector('.map').innerHTML += `
            <div class="elementContainer" onclick='reactor_tycoon.element.toOnElement(${idElement})'>
                <div>${nameElement}</div>
            </div>
            `
        }
    }
}

reactor_tycoon.initGame()
reactor_tycoon.shopping.buy(0)


