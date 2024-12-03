import { requisiciones } from "./requisicionesProductos.js";

const contenedorProductos = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");


function crearEstructuraCard({ name, price, image, id }) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
		<div class="img-container">
			<img src="${image}" alt="${name}">
		</div>
		<div class="card-container--info">
			<p>${name}</p>
			<div class="card-container--value">
				<p>$ ${price}</p>		
			</div>
      <button class="delete-button" data-id="${id}">
					<img src="./assets/trashIcon.png" alt="Eliminar" class="papelera" >
				</button>
		</div>
	`;

  
  eventoEliminarProducto(card, name);

  return card;
}

function eventoEliminarProducto(card, name) {

  const botonEliminar = card.querySelector(".delete-button");

  botonEliminar.addEventListener("click", async () => {

    try {
      await requisiciones.borrarProducto(name);
      card.remove();
      alert(`Producto ${name} eliminado`);
    } catch (error) {
      alert(`Error al eliminar el producto ${name}`, error);
      }

  });

}


const renderizarProductos = async () => {
  try {
    const listProducts = await requisiciones.listarProductos();
    listProducts.forEach((product) => {
      const productCard = crearEstructuraCard(product);
      contenedorProductos.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error al renderizar productos", error);
    }
};


form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;

  if (name === "" || price === "" || image === "") {
    alert("Por favor, complete todos los campos");
  } else {
    try {
      const nuevoProducto = await requisiciones.crearProducto(
        name,
        price,
        image
      );
      alert(`Producto agregado: ${name}`, nuevoProducto);
      const nuevaCard = crearEstructuraCard(nuevoProducto);
      contenedorProductos.appendChild(nuevaCard);
    } catch (error) {
      alert("Error al crear el producto", error);
    }

    form.reset(); 
  }
});


renderizarProductos();
