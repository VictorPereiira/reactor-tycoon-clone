import resources from '../resources.js'

function mapGenerator(size, tress, mountains, value) {
    let free_place,
        tressBox = [],
        mountainBox = []

    for (let trIndex = 0; trIndex < tress; trIndex++) {
        tressBox.push({
            'id': trIndex,
            'destruct_value': 4
        })
    }
    for (let mtIndex = 0; mtIndex < mountains; mtIndex++) {
        mountainBox.push({
            'id': mtIndex,
            'destruct_value': 4
        })
    }

    free_place = size - (tressBox.length + mountainBox.length)

    return {
        'size': size,
        'free_place': free_place,
        'trees': tressBox,
        'mountains': mountainBox,
        'building_site': [],
        'state': 'close',
        'value_island': value
    }
}

export default function createMaps() {
    return [
        mapGenerator(70, 15, 6, 0),
        mapGenerator(82, 21, 9, 500000)
    ]
}