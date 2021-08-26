import resources from './resources.js'

export default function initGame() {
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

    resources('toDOM', 'menu')
    resources('access', 'draw').map()
    resources('element', 'callToAllElements')

    document.querySelector('.energy').textContent = localStorage.energy
    document.querySelector('.cash').textContent = localStorage.cash
}

initGame()