// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("ID:", id); // Debug

if(id){

    fetch("https://fakestoreapi.com/products/" + id)
    .then(response => response.json())
    .then(product => {

        console.log(product); // Debug

        document.getElementById("product-detail").innerHTML = `
            <div class="detail-card">
                <img src="${product.image}" style="width:300px;height:300px;object-fit:contain;">
                <h2>${product.title}</h2>
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p>${product.description}</p>
            </div>
        `;
    })
    .catch(error => {
        console.log("Error:", error);
        document.getElementById("product-detail").innerHTML =
        "<h2>Product Not Found</h2>";
    });

}else{
    document.getElementById("product-detail").innerHTML =
    "<h2>No Product Selected</h2>";
}
