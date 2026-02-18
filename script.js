let allProducts = [];

// Fetch Products from API
fetch('https://fakestoreapi.com/products')
.then(res => res.json())
.then(data => {
    allProducts = data;
    displayProducts(allProducts);
    updateCartCount();
});

// Display Products
function displayProducts(products){
    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(product=>{
        container.innerHTML += `
            <div class="card">
                <img src="${product.image}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button onclick="viewProduct(${product.id})">View</button>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

// View Product Page
function viewProduct(id){
    window.location.href = "product.html?id=" + id;
}

// Filter Products
function filterProducts(category){
    if(category === "all"){
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p =>
            p.category.toLowerCase().includes(category)
        );
        displayProducts(filtered);
    }
}

// Search Products
function searchProducts(){
    const value = document.getElementById("search").value.toLowerCase();
    const filtered = allProducts.filter(p =>
        p.title.toLowerCase().includes(value)
    );
    displayProducts(filtered);
}

// Add To Cart
function addToCart(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = allProducts.find(p => p.id === id);

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Product Added to Cart ✅");
}

// Update Cart Count
function updateCartCount(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}
