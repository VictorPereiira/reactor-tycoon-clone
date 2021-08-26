import access from './resources.js'

export default function actions() {
    console.log('actions...');

    return {
        converterEnergyToCash: () => {
            console.log('converter cash...')
            console.log(' ')

            let energyValue = Number(localStorage.energy),
                energyCapacity = Number(localStorage.energyCapacity),
                cashValue = Number(localStorage.cash),
                fullCapacity

            if (energyValue < 1) return console.log('You not have energy! ⚡')
            if (energyValue === energyCapacity) fullCapacity = true
            cashValue += energyValue
            energyValue = 0

            localStorage.cash = cashValue
            localStorage.energy = energyValue
            document.querySelector('.cash').textContent = cashValue
            document.querySelector('.energy').textContent = energyValue
            if (fullCapacity) access("element").callToAllElements()
        },

        buy: (id, quantity) => {
            console.log('buy...')
            console.log(' ')

            let elementBuy = access("element").box(id),
                cashValue = localStorage.cash,
                valueBuy = elementBuy.unitValue * quantity


            if (cashValue >= valueBuy) {
                console.log('buying...')
                console.log(' ')

                cashValue -= valueBuy
                localStorage.cash = cashValue
                document.querySelector('.cash').textContent = cashValue


                access("actions").putOnTheMap(elementBuy, quantity)
            }
            else console.log('You not have cash! 😞')
        },

        putOnTheMap(elementBuy, quantity) {
            console.log('putOnTheMap...')
            console.log(' ');

            let currentMap = JSON.parse(localStorage.mapOn),
                building_site = currentMap.building_site,
                count = 0

            while (count < quantity) {
                building_site.push(elementBuy)
                quantity--
            }

            localStorage.mapOn = JSON.stringify(currentMap)
            access("element").callToAllElements()
            access("draw").map()
        }
    }
}

