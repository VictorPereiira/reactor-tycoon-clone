const assert = require('assert');

var game = function (id) {
    var component = [
        {
            'Name': 'WindTurbine',
            'UnitValue': 1,
            'Production': 1,
            'LifeTime': 5
        }
    ]

    var box = {
        'Cash': 1,
        'Energy': {
            'Value': 0,
            'Capacity': 200
        }
    }

    var map = [];

    function buy(id) {
        let cash = box.Cash,
            cName = component[id].Name,
            unitValue = component[id].UnitValue;

        cash >= unitValue ? cash -= unitValue : cash;

        box.Cash = cash;
        map.push(id);

        countEnergy();

        function countEnergy(id) {
            let life = component[id].LifeTime,
                production = component[id].Production,
                resultEnergy = production * life;

            box.Energy.Value = resultEnergy;
        }
    }



    function converterEnergyToCash(params) {

    }

    buy(id)
    return box
}


try {
    let res;

    assert.strictEqual(res, game(0))

} catch (error) {
    console.log(error);
}