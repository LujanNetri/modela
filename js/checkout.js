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
    {
        metodoPago ="Credit Card"
    }
}