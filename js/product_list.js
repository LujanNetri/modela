function obtengoSeccionActual() {
  return document.body.dataset.seccion;
}

function imprimoProductosHTML(productos) {
  const contenedor = document.getElementById("product_container");

  productos.forEach(function(producto){
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img" />
                        <p class="category">${producto.categoria}</p>
                        <h3 class="product_name">${producto.nombre}</h3>
                        <p class="price">$${producto.precio}</p>
                        <button id="btn-${producto.id}" class="btn-comprar">Add to cart</button>`;
    contenedor.appendChild(card);
    const boton = document.getElementById(`btn-${producto.id}`);
    boton.addEventListener("click", () => agregaAlCarrito(producto));
  });
}

let carrito = [];
try 
{
  const datos = localStorage.getItem("carrito");

  if (datos != null) 
    carrito = JSON.parse(datos);
} catch (error) 
{
  console.error("Error al recuperar la informacion del carrito", error);
  carrito = [];
}

function agregaAlCarrito(producto) 
{
  const productoEnCarrito = carrito.find((productoABuscar) => productoABuscar.id === producto.id);

  if (productoEnCarrito) 
    productoEnCarrito.cantidad++;
  else 
  {
    let productoNuevo = 
    {
      id: producto.id,
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1,
    };
    carrito.push(productoNuevo);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizoContadorCarrito();

  Toastify({
    text: `"${producto.nombre}" added to cart!`,
    duration: 1000,
    gravity: "top",
    position: "right",
    close: true,
    style: {
      background: "linear-gradient(to right,#8B4513,#8B4513)",
      color: "#fff",
    },
  }).showToast();
}

function actualizoContadorCarrito() 
{
  const contador = document.getElementById("carrito-contador");
  let total = 0;

  carrito.forEach(function(producto){
    total+=producto.cantidad
  })

  contador.innerText = total;
}

const seccion = obtengoSeccionActual();
fetch("../db/data.json")
  .then((response) => response.json())
  .then((data) => {
    const productos = data[seccion] || [];
    imprimoProductosHTML(productos);
  })
.catch((err) => console.error("Error cargando productos:", err));

actualizoContadorCarrito();
