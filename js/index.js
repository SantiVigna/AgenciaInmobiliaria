const requestURL = './json/burgers.json';

async function fetchBurgerJson(){
    try{
        const response = await fetch(requestURL);
        if (!response.ok) {
            throw new Error(`Error en la peticion ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error(`Error al obtener las burgers de la API : `,error);
        return null;
    }
}

function createBurgerCard ({id, name, image, price, description}){
    return `<div class="card-group">
                <div class="card">
                    <img src="${image}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${id} - ${name}</h5>
                        <h6 class="card-text">€ ${price}</h6>
                        <p class="card-text"><small class="text-muted">${description}</small></p>
                    </div>
                </div>
            </div>
    `;
}

async function displayBurgers() {
    const burgerSection = document.getElementById('burgerSection');
    const burgersData = await fetchBurgerJson();

    if (burgersData && burgersData.burgers){
        const burgerCards = burgersData.burgers.map(createBurgerCard).join('');
        burgerSection.innerHTML = burgerCards;
    }
    else{
        burgerSection.innerHTML = `<p>No se ha podido cargar el Json de las burgers</p>`
    }
}
displayBurgers();