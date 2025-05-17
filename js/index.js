let carrito = [];
try {
  const datos = localStorage.getItem("carrito");

  if (datos != null) carrito = JSON.parse(datos);
} catch (error) {
  console.error("Error al recuperar la informacion del carrito", error);
  carrito = [];
}

function actualizoContadorCarrito() {
  const contador = document.getElementById("carrito-contador");
  let total = 0;

  carrito.forEach(function (producto) {
    total += producto.cantidad;
  });

  contador.innerText = total;
}

actualizoContadorCarrito()