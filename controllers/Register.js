const form = document.getElementById("miFormulario");
const popup = document.getElementById("popup");
const closeButton = document.getElementById("close-popup");

    function showPopup() {
    popup.style.display = "block";
    }

    function hidePopup() {
    popup.style.display = "none";
    }

    form.addEventListener("submit", function (event) {
    event.preventDefault();

    showPopup();
    });

    closeButton.addEventListener("click", function (event) {
    event.preventDefault();

    hidePopup();
    });

    document.getElementById("boton").addEventListener("click", async () => {
    const productId = document.getElementById("product-id").value;
    const quantity = document.getElementById("quantity").value;
    if (!productId || !quantity) {
        alert("Por favor, ingrese el ID del producto y la cantidad.");
        return;
    }
    try {
        const response = await fetch(`http://127.0.0.1:8080/cocktail/${productId}`);
        if (!response.ok) {
        throw new Error("Error al obtener los datos del producto");
        }
        const cocktail = await response.json();
        const name = cocktail.name;
        const amount = cocktail.amount;
        const price = cocktail.price;
        const daysToExpiry = cocktail.dueDate;
        let totalPrice;
        let discountMessage = "";
        if (daysToExpiry > 1) {
        if (daysToExpiry === 3) {
            totalPrice = quantity * price * 0.98;
            discountMessage = "Has obtenido un descuento del 2%.";
        } else if (daysToExpiry === 2) {
            totalPrice = quantity * price * 0.965;
            discountMessage = "Has obtenido un descuento del 3.5%.";
        } else if (daysToExpiry === 1) {
            totalPrice = quantity * price * 0.95;
            discountMessage = "Has obtenido un descuento del 5%.";
        } else {
            totalPrice = quantity * price;
        }
        } else {
        totalPrice = quantity * price;
        }
        document.getElementById("product-name").innerText = `${name}`;

        document.getElementById("product-quantity").innerText = `${quantity}`;

        document.getElementById("product-price").innerText = `${totalPrice.toFixed(
        2
        )}`;

        document.getElementById(
        "product-discount"
        ).innerText = `${discountMessage}`;
    } catch (error) {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
    }
    });
