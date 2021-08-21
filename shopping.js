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

