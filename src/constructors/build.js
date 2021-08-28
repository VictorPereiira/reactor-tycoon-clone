import resources from "../resources.js";

export default function build() {
    let element = resources('access', 'element').getBox('all')

    for (let i in element) {
        document.querySelector('.mold .mold_content').innerHTML += `
        <div class="build_element_container" id="${i}">
            <div class="imgContainer"> ${element[i].img}</div>
            <h3>${element[i].name}</h3>
            <div>
                <span>${element[i].unitValue}</span>
                💲
            </div>
            <p>PRODUCES <span>${element[i].production.value}</span> POWER</p>
            <small>LIFETIME: <span>${element[i].lifeTime.value}</span></small>
        </div>
        `

    }

    let allBuildsItens = document.querySelectorAll('.build_element_container')

    for (let x in element) {
        allBuildsItens[x].addEventListener('click', e => {
            resources('access', 'actions').buy(x)
            document.querySelector('.mold').innerHTML = ' '
            document.querySelector('.menu_button').style.display = 'inline'
            document.querySelector('.convertButton').style.display = 'inline'
        })
    }
}


