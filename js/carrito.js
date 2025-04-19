let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function muestroCarrito() {
  const main = document.querySelector("main");
  main.innerHTML = "";

  if (carrito.length === 0)
    main.innerHTML = `<p id="texto-vacio">Your cart is empty:</p>`;

  const contenedor = document.createElement("div");
  contenedor.classList.add("carrito-contenedor");

  let total = 0;

  for (const producto of carrito) {
    const productoEnHTML = document.createElement("div");
    productoEnHTML.classList.add("carrito-producto");

    productoEnHTML.innerHTML = `<img src =${producto.imagen} alt="${producto.nombre}" class="carrito-imagen"</>
                                <div class = "producto-info">
                                  <div class = "producto-titulo">
                                    <h3>${producto.nombre}</h3>    
                                    <p class="categoria">${producto.categoria}</p>
                                  </div>
                                  <div class = "producto-detalle">
                                    <div class = "cantidad">
                                      <button class ="sumar" data-id="${ producto.id}">+</button>
                                      <p>${producto.cantidad}</p>
                                      <button class = "restar" data-id="${producto.id}">-</button>
                                    </div>
                                    <p class = "precio">Price: $${producto.precio}</p>
                                    <p class = "subtotal">Subtotal: $${producto.precio*producto.cantidad}</p>
                                  </div>
                                </div>
                                `;

    contenedor.appendChild(productoEnHTML);

    total += producto.precio * producto.cantidad;
  }

  const totalEnHTML = document.createElement("h2");
  totalEnHTML.innerText = `Total to pay: $${total}`;
  contenedor.appendChild(totalEnHTML);

  main.appendChild(contenedor);

  agregobotones();
}

function agregobotones() {
  const botonSumar = document.querySelectorAll(".sumar");
  const botonRestar = document.querySelectorAll(".restar");

  for (const boton of botonSumar) {
    boton.addEventListener("click", () => {
      const id = parseInt(boton.dataset.id);
      const producto = carrito.find(
        (productoABuscar) => productoABuscar.id === id
      );
      if (producto) {
        producto.cantidad++;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        muestroCarrito();
      }
    });
  }

  for (const boton of botonRestar) {
    boton.addEventListener("click", () => {
      const id = parseInt(boton.dataset.id);
      const producto = carrito.find(
        (productoAbuscar) => productoAbuscar.id === id
      );
      if (producto) {
        producto.cantidad--;
        if (producto.cantidad <= 0) {
          carrito = carrito.filter(
            (productoAbuscar) => productoAbuscar.id !== id
          );
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        muestroCarrito();
      }
    });
  }
}

muestroCarrito();
