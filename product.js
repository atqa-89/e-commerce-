const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(product => {
        document.getElementById("product-detail").innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.image}">
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Description:</strong> ${product.description}</p>
        `;
    });
function displayProducts(products) {
    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="card">
                <img src="${product.image}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button onclick="viewProduct(${product.id})">View Details</button>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = allProducts.find(p => p.id === id);

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}

updateCartCount();
