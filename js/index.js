const requestURL = './json/products.json';

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
    return `<div class="card" style="width: 18rem;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${price}€</h5>
                <p class="card-text">${id} - ${name}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${description}</li>
            </ul>
        </div>
    `;
}

async function displayBurgers() {
    const burgerSection = document.getElementById(`burgerSection`);
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