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
                'Name': 'Wind Turbine',
                'UnitValue': 1,
                'Production': 1,
                'LifeTime': 5
            }
        ],

        buy(id, quantity = 1) {
            let game = reactor_tycoon,
                elementBuy = this.box[id],
                cashAccess = game.controlPanel.cash,
                value = elementBuy.UnitValue * quantity

            console.log(`you have ${game.controlPanel.cash} in cash!!!`)


            if (cashAccess >= value) {
                console.log('buying...')
                console.log(' ');

                cashAccess -= value
                game.controlPanel.cash -= value
                localStorage.setItem('cash', cashAccess)


                this.putOnTheMap(elementBuy)
            }
        },

        putOnTheMap(elementBuy) {
            let currentMap = JSON.parse(localStorage.mapOn),
                lifeTimeElement = elementBuy.LifeTime

            currentMap.building_site.push(elementBuy)
            reactor_tycoon.element.toOnElement(lifeTimeElement, currentMap.building_site)
            console.log(currentMap.building_site)
        }
    },

    element: {
        toOnElement(lifeTimeElement, buildingSiteMap) {
            if (buildingSiteMap < 1) return
            let game = reactor_tycoon,
                energyValue = game.controlPanel.energyValue,
                energyCapacity = game.controlPanel.energyCapacity

            const cpt = setInterval(() => {
                if (energyValue === energyCapacity) return
                else energyValue++

                lifeTimeElement--

                console.log(`Energy_Value: ${energyValue}`)
                console.log(`Life_Time_Component: ${lifeTimeElement}`)
                console.log(' ')

                if (lifeTimeElement < 1) {
                    clearInterval(cpt)
                    // 
                    // this.component[0].LifeTime = 5
                    // reactor_tycoon.toOnComponent()
                }
            }, 1000)
        }
    },

    actions: {
        converterEnergyToCash() {
            if (this.energyValue < 1) return

            this.cash = this.energyValue
            this.energyValue = 0

            console.log(this.cash)
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

            console.log('put start configs...');
        } else {
            this.controlPanel.cash = localStorage.cash
            this.mapOn = JSON.parse(localStorage.mapOn)

            document.querySelector('.cash').textContent = localStorage.cash
            console.log('get configs data...');
        }

        console.log(' ');
    }

}

reactor_tycoon.initGame()
reactor_tycoon.shopping.buy(0)


