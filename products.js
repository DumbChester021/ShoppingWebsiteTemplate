const urlParams = new URLSearchParams(location.search);
const productId = urlParams.get("product");

var productImg = document.getElementById("productImg");
var productName = document.getElementById("productName");
var productDescription = document.getElementById("productDescription")
var productPrice = document.getElementById("productPrice");
var bloatedPrice = document.getElementById("bloatedPrice")

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
            productPrice.innerHTML = "₱" + product.price + ".00";
            bloatedPrice.innerHTML = "₱" + (product.price + ( product.price *  0.2 ));
            skuId.innerHTML = "SKU: JS-"+ product.id;
        }
    });

        // Get the buy button and shipping modal elements
    var buyButton = document.getElementById("buyButton");
    var shippingModal = document.getElementById("shippingModal");

    // Add an event listener to the buy button to open the modal when clicked
    buyButton.addEventListener("click", function() {
        shippingModal.classList.add("show");
        shippingModal.style.display = "block";
    });

    // Add an event listener to the close button to close the modal when clicked
    var closeButton = document.querySelector(".btn-close");
    closeButton.addEventListener("click", function() {
        shippingModal.classList.remove("show");
        shippingModal.style.display = "none";
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