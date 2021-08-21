class Shopping {
    this.cash = 0,
    this.box: [
        {
            'name': 'element_1',
            'value': 5
        },
        {
            'name': 'element_2',
            'value': 10
        },
        {
            'name': 'element_3',
            'value': 30
        }
    ],
        map: [],


            // Game functions
            initGame() {
    if (localStorage.getItem('cash') === null) {
        localStorage.setItem('cash', 0)
        localStorage.setItem('map', JSON.stringify(this.map))
    } else {
        this.cash = localStorage.cash
        this.map = JSON.parse(localStorage.map)
        document.querySelector('.cash').textContent = localStorage.cash
    }
},

startGame() {
    let time = setInterval(() => {
        this.cash++
        localStorage.setItem('cash', this.cash)
        document.querySelector('.cash').textContent = this.cash
    }, 1000)

    document.querySelector('.startButton').style.display = 'none'
    document.querySelector('p').style.display = 'block'


    for (let i in this.box) {
        let nameEl = this.box[i].name,
            valueEl = this.box[i].value

        document.querySelector('.shopping').innerHTML += `
            <div class="elementBuy_container" onclick="shopping.buy(${i}, 1)">
                <h3>${nameEl}</h3>
                <p>${valueEl}</p>
            </div>
        `
    }

    for (let x in this.map) {
        let nameElement = this.map[x].name

        document.querySelector('.map').innerHTML += `
            <div>
                <div>${nameElement}</div>
            </div>
        `
    }
},

draw(id) {
    let nameElement = this.map[id].name

    document.querySelector('.map').innerHTML += `
            <div>
                <div>${nameElement}</div>
            </div>
        `
},

// Player functions
buy(id, quantity) {
    let elementBuy = this.box[id],
        value = elementBuy.value * quantity

    if (this.cash >= value) {
        this.cash -= value
        localStorage.setItem('cash', this.cash)

        while (quantity > 0) {
            quantity--
            this.map.push(elementBuy)
            this.draw(id)
            localStorage.setItem('map', JSON.stringify(this.map))
        }
    }
}
}



reactor_tycoon = {

    controlPanel: {
        'cash': 1,
        'energyValue': 0,
        'energyCapacity': 200,
        'search': 0
    },

    ,

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
            let elementBuy = this.box[id],
                cashAccess = localStorage.cash,
                value = elementBuy.unitValue * quantity

            if (cashAccess >= value) {
                console.log('buying...')
                console.log(' ');

                cashAccess -= value
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

    element: {
        toOnElement(id) {
            console.log('the element ' + id + ' was active!');

            let currentMap = JSON.parse(localStorage.mapOn),
                buildingSite = currentMap.building_site,
                element = buildingSite[id],
                lifeTimeElement = element.lifeTime

            if (element.elementStatus === "on") {
                localStorage.mapOn = JSON.stringify(currentMap)
                console.log(buildingSite);
                return console.log('This element work 🛠')
            } else {
                var cpt = 'cpt' + id
                localStorage.setItem('cpt', cpt)

                console.log('tuOn: ' + id + ' element');
                element.elementStatus = "on"
                localStorage.mapOn = JSON.stringify(currentMap)
            }

            cpt = setInterval(function () {
                if (element.elementStatus === "on") {
                    var energyValue = localStorage.energyValue,
                        energyCapacity = localStorage.energyCapacity
                }

                console.log(energyValue);

                if (energyValue === energyCapacity) return console.log('You reached the maximum energyCapacity ⚠');

                energyValue++
                lifeTimeElement--
                localStorage.energyValue = energyValue
                document.querySelector('.energy').textContent = energyValue

                if (lifeTimeElement < 1) {
                    clearInterval(cpt)
                    element.elementStatus = 'off'
                    localStorage.mapOn = JSON.stringify(currentMap)

                    // autoOnElement
                    // this.component[0].LifeTime = 5
                    // reactor_tycoon.toOnComponent()
                }
            }, 150)
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