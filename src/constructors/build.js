import resources from "../resources.js";

export default function build() {
    let element = resources('access', 'element').box('all')

    for (let i in element) {
        document.querySelector('.mold .mold_content').innerHTML = `
        <div class="build_element_container" id="${element.id}">
            <div class="imgContainer">${element.img}</div>
            <h3>${element.name}</h3>
            <div>
                <span>${element.unitValue}</span>
                💲
            </div>
            <p>PRODUCES <span>${element.production}</span> POWER</p>
            <small>LIFETIME: <span>${element.lifeTime}</span></small>
        </div >
    `
    }
}

