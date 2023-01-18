const urlParams = new URLSearchParams(location.search);
const productId = urlParams.get("product");

var productImg = document.getElementById("productImg");
var productName = document.getElementById("productName");
var productDescription = document.getElementById("productDescription")
var skuId = document.getElementById("skuId");

console.log("The productId is:" + productId);

fetch('products.json')
    .then(response => response.json())
    .then(data => {
        let product = data.products.find(p => p.id == productId);
        if (product) {
            productImg.src = product.imgSrc;
            productName.innerHTML = product.name;
            productDescription.textContent = product.description;
            skuId.innerHTML = "SKU: JS-"+ product.id;
        }
    });
