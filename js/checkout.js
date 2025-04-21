let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const form = document.getElementById("form_checkout")
const resumen = document.getElementById("resumen_compra")

form.onsubmit = function (evento)
{
    evento.preventDefault()

    const nombre = document.getElementById("nombre").value 
    const email = document.getElementById("email").value
    const direccion = document.getElementById("direccion").value

    const metodoPagoCredito = document.getElementById("credito")
    const metodoPagoDebito = document.getElementById("Debito")

    let metodoPago = ""
    if(metodoPagoCredito.checked)
        metodoPago ="Credit Card"
    else if (metodoPagoDebito.checked)
        metodoPago = "Debit Card"
    else
    {
        alert("Please select a payment method.");
        return
    } 
        
        
    if(carrito.length === 0)
    {
        alert("Your carts is empty")
        return
    }

    let total = 0
    let listaProductos = ""

    carrito.forEach(function (producto) {
        const subtotal = producto.precio * producto.cantidad
        total += subtotal
        listaProductos += `<li>${producto.nombre} x${producto.cantidad} - $${subtotal}</li>` 
    });

    resumen.innerHTML = `<h2> Purchase Summary</h2>
                         <p>Name: ${nombre}</p>
                         <p>Email: ${email}</p>
                         <p>Adress: ${direccion}</p>
                         <p>Payment Method: ${metodoPago}</p>
                         <h3>Products:</h3>   
                         <ul>${listaProductos}</ul>
                         <h3>Total: $${total}</h3>
                         <p>Thank you for your purchase!<p>                 
    `
    carrito = []
    localStorage.setItem("carrito",JSON.stringify(carrito))
    form.reset()
}