let carrito = []
try 
{
  const datos = localStorage.getItem("carrito")

  if(datos != null)
    carrito=JSON.parse(datos)
} catch(error)
{
  console.error("Error al recuperar la informacion del carrito", error)
  carrito=[]
}

const form = document.getElementById("form_checkout")
const resumen = document.getElementById("resumen_compra")
const mensajeError = document.getElementById("mensaje_error");

form.onsubmit = function (evento)
{
  evento.preventDefault()

  mensajeError.textContent = ""

  const nombre = document.getElementById("nombre").value
  const apellido = document.getElementById("apellido").value 
  const email = document.getElementById("email").value
  const direccion = document.getElementById("direccion").value
  const metodoPagoCredito = document.getElementById("credito")
  const metodoPagoDebito = document.getElementById("debito");

  let metodoPago = ""
  if(metodoPagoCredito.checked)
    metodoPago ="Credit Card"
  else if (metodoPagoDebito.checked)
    metodoPago = "Debit Card"

  Swal.fire({
    title: "Are you sure you want to complete the purchase?",
    text: "Please confirm to finalize your order.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, confirm purchase",
    cancelButtonText: "No, cancel"
    }).then((result) => 
      {
        if (result.isConfirmed) 
        {
          let total = 0;
          let listaProductos = "";

          carrito.forEach(function (producto) {
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;
            listaProductos += `<li>${producto.nombre} x${producto.cantidad} - $${subtotal}</li>`;
          });

          resumen.classList.add("mostrar");
          resumen.innerHTML = `<h2> Purchase Summary</h2>
                                <p>Name: ${nombre} ${apellido}</p>
                                <p>Email: ${email}</p>
                                <p>Adress: ${direccion}</p>
                                <p>Payment Method: ${metodoPago}</p>
                                <h3>Products:</h3>   
                                <ul>${listaProductos}</ul>
                                <h3>Total: $${total}</h3>
                                <p id="texto-compra-final">Thank you for your purchase!<p>`;
          carrito = [];
          localStorage.setItem("carrito", JSON.stringify(carrito));
          form.reset();

          Swal.fire({
            title: "Purchase Confirmed",
            text: "Your order has been successfully processed.",
            icon: "success",
          });
        }
    });
}