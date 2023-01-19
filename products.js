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

    let mybutton = document.getElementById("btn-back-to-top");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
      scrollFunction();
    };
    
    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
    // When the user clicks on the button, scroll to the top of the document
    mybutton.addEventListener("click", backToTop);
    
    function backToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }