const params = new URLSearchParams(window.location.search);
const inDate = params.get(inDate);
const outDate = params.get(outDate);
const hosts = parseInt(params.get(hosts));

const totalHosts = adults + children;

const suites = [
    { name: "Suite Deluxe", capacity: 2, description: "Description here.", price:"2,500€", className: "s-deluxe", img:"pexels-kadiravsarr-24877168.jpg"},
    { name: "Suite Familiar", capacity: 4, description: "Description here.", price:"3,500€", className: "s-fam", img:"pexels-kadiravsarr-24877193.jpg"},
    { name: "Suite Individual", capacity: 1, description: "Description here.", price:"1,500€", className: "s-indiv", img:"pexels-kadiravsarr-24877168.jpg"},
];

const resultados = dispRooms.filter(h => h.capacity >= totalHosts);

const container = document.getElementById('resultados');

resultados.forEach (h => {
    container.innerHTML += `
    <div class="${h.className}">
            <div class="block-cont">
                <img class="s-img" src="${h.img}" alt="">
                <div class="b-c-cont">
                    <div class="b-t-cont">
                        <h3>${h.name}</h3>
                        <p>${h.description}.</p>
                    </div>
                    <div class="b-p-cont">
                        <h3>${h.price}</h3>
                        <button>Seleccionar</button>
                    </div>
                </div>
            </div>
        </div>
    `
})