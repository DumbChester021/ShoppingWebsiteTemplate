const urlParams = new URLSearchParams(location.search);
const productU = urlParams.get("product");
const productNameU = urlParams.get("name");

var productImg = document.getElementById("productImg");
var productName = document.getElementById("productName");

productImg.src = "assets/product" + productU + ".png";
productName.textContent = productNameU;
console.log("The PriductU is:" + productU);
