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
                'LifeTime': 5,
                'ElementStatus': 'off'
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
                localStorage.cash = cashAccess

                this.putOnTheMap(elementBuy)
            }
        },

        putOnTheMap(elementBuy) {
            let currentMap = JSON.parse(localStorage.mapOn),
                lifeTimeElement = elementBuy.LifeTime,
                nameElement = elementBuy.Name

            currentMap.building_site.push(elementBuy)

            document.querySelector('.map').innerHTML += `
                    <div onclick="reactor_tycoon.element.toOnElement(${currentMap.building_site}, 0)" class="elementContainer">
                        <div>${nameElement}</div>
                    </div>
                `

            reactor_tycoon.element.toOnElement(currentMap.building_site, 0)
            console.log(currentMap.building_site)
        }
    },

    element: {
        toOnElement(building_site, id) {
            console.log(`this is a building_site: ${building_site}`);
            let element = building_site[id],
                lifeTimeElement = element.LifeTime

            if (element.ElementStatus === "on") return console.log('funfou!!!');
            // if (buildingSiteMap < 1) return



            const cpt = setInterval(() => {
                let game = reactor_tycoon,
                    energyValue = game.controlPanel.energyValue,
                    energyCapacity = game.controlPanel.energyCapacity

                if (energyValue === energyCapacity) return

                energyValue++
                lifeTimeElement--
                localStorage.energyValue = energyValue
                localStorage.energyCapacity = energyCapacity
                reactor_tycoon.initGame()

                console.log(`Energy_Value: ${energyValue}`)
                console.log(`Life_Time_Component: ${lifeTimeElement}`)
                console.log(' ')

                if (lifeTimeElement < 1) {
                    clearInterval(cpt)
                    element.ElementStatus = 'on'
                    console.log(element);

                    // autoOnElement
                    // this.component[0].LifeTime = 5
                    // reactor_tycoon.toOnComponent()
                }
            }, 1000)
        }
    },

    actions: {
        converterEnergyToCash() {
            if (localStorage.energyValue == 0) return
            let game = reactor_tycoon
            game.initGame()

            let energyValue = game.controlPanel.energyValue,
                cash = game.controlPanel.cash

            if (game.controlPanel.energyValue < 1) return
            cash += energyValue
            localStorage.cash = cash
            localStorage.energyValue = 0

            game.initGame()
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
    }
}

reactor_tycoon.initGame()
reactor_tycoon.shopping.buy(0)


