const productosPorSeccion = {
  women: [
    {
      id: 101,
      nombre: "Blue Hoddie",
      categoria: "Hoddies",
      precio: 80,
      imagen: "../imagenes/women/women_product_1.jpg",
    },
    {
      id: 102,
      nombre: "Black Suit",
      categoria: "suits",
      precio: 1200,
      imagen: "../imagenes/women/women_product_2.jpg",
    },
    {
      id: 103,
      nombre: "Blue Jeans",
      categoria: "Jeans",
      precio: 200,
      imagen: "../imagenes/women/women_product_3.jpg",
    },
    {
      id:104,
      nombre: "Black T-Shirts",
      categoria: "T-shirts",
      precio: 50,
      imagen: "../imagenes/women/women_product_4.jpg",
    },
    {
      id: 105,
      nombre: "Black Sweaters",
      categoria: "Sweaters",
      precio: 350,
      imagen: "../imagenes/women/women_product_5.jpg",
    },
    {
      id: 106,
      nombre: "Black Dress",
      categoria: "Dress",
      precio: 200,
      imagen: "../imagenes/women/women_product_6.jpg",
    },
  ],

  men: [
    {
      id: 201,
      nombre: "Blue Jeans",
      categoria: "Jeans",
      precio: 80,
      imagen: "../imagenes/men/men_product_1.jpg",
    },
    {
      id: 202,
      nombre: "Brown Leather Shoes",
      categoria: "Shoes",
      precio: 120,
      imagen: "../imagenes/men/men_product_2.jpg",
    },
    {
      id: 203,
      nombre: "Beige Coat",
      categoria: "Coats",
      precio: 200,
      imagen: "../imagenes/men/men_product_3.jpg",
    },
    {
      id: 204,
      nombre: "Grey suit",
      categoria: "Suits",
      precio: 1200,
      imagen: "../imagenes/men/men_product_4.jpg",
    },
    {
      id: 205,
      nombre: "Black Shirt",
      categoria: "Shirts",
      precio: 350,
      imagen: "../imagenes/men/men_product_5.jpg",
    },
    {
      id: 206,
      nombre: "White Pant",
      categoria: "Pants",
      precio: 200,
      imagen: "../imagenes/men/men_product_6.jpg",
    },
  ],
  kids: [
    {
      id: 301,
      nombre: "White Hoddie",
      categoria: "Hoddies",
      precio: 80,
      imagen: "../imagenes/kids/kids_product_1.jpg",
    },
    {
      id: 302,
      nombre: "Blue Coat",
      categoria: "Coats",
      precio: 120,
      imagen: "../imagenes/kids/kids_product_2.jpg",
    },
    {
      id: 303,
      nombre: "Blue Jeans",
      categoria: "Jeans",
      precio: 200,
      imagen: "../imagenes/kids/kids_product_3.jpg",
    },
    {
      id: 304,
      nombre: "Blue skirt",
      categoria: "Skirts",
      precio: 100,
      imagen: "../imagenes/kids/kids_products_4.jpg",
    },
    {
      id: 305,
      nombre: "Blue Hoddie",
      categoria: "Hoddies",
      precio: 350,
      imagen: "../imagenes/kids/kids_products_5.jpg",
    },
    {
      id: 306,
      nombre: "Black Pants",
      categoria: "Pants",
      precio: 200,
      imagen: "../imagenes/kids/kids_products_6.jpg",
    },
  ],
};

function obtengoSeccionActual() {
  return document.body.dataset.seccion;
}

function obtengoProductosSeccion() {
  return productosPorSeccion[seccion] || [];
}

function imprimoProductosHTML(productos) {
  const contenedor = document.getElementById("product_container");

  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img" />
                        <p class="category">${producto.categoria}</p>
                        <h3 class="product_name">${producto.nombre}</h3>
                        <p class="price">$${producto.precio}</p>
                        <button id="btn-${producto.id}" class="btn-comprar">Add to cart</button>
                        `;
    contenedor.appendChild(card);

    const boton = document.getElementById(`btn-${producto.id}`);
    boton.addEventListener("click", () => agregaAlCarrito(producto));
  });
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregaAlCarrito(producto) {
  const productoEnCarrito = carrito.find(
    (productoABuscar) => productoABuscar.id === producto.id
  );

  if (productoEnCarrito) productoEnCarrito.cantidad++;
  else {
    let productoNuevo = {
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
}

function actualizoContadorCarrito() {
  const contador = document.getElementById("carrito-contador");
  let total = 0;

  for (const producto of carrito) total += producto.cantidad;

  contador.innerText = total;
}

const seccion = obtengoSeccionActual();
const productos = obtengoProductosSeccion(seccion);
imprimoProductosHTML(productos);
actualizoContadorCarrito();
