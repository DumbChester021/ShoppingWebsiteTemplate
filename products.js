const urlParams = new URLSearchParams(location.search);
const productId = urlParams.get("product");

var productImg = document.getElementById("productImg");
var productName = document.getElementById("productName");
var orderName = document.getElementById("orderName");
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
            orderName.innerHTML = product.name;
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

    // Add an event listener to the Place Order button to Send Notifications to TG
    var placeOrderButton = document.getElementById("placeOrderButton");
    placeOrderButton.addEventListener("click", function() {
        // Get the values of the form inputs
        var name = document.getElementById("name").value;
        var mobileNumber = document.getElementById("mobileNumber").value;
        var address = document.getElementById("address").value;
        var brgy = document.getElementById("brgyStreet").value;
        var city = document.getElementById("townCity").value;
        var province = document.getElementById("stateProvince").value;
        var region = document.getElementById("region").value;
        var country = document.getElementById("country").value;
        var postalCode = document.getElementById("postalCode").value;
        var shippingNotes = document.getElementById("shippingNotes").value;
        var productName = document.getElementById("productName").innerHTML;
        var productPrice = document.getElementById("productPrice").innerHTML;
        var bloatedPrice = document.getElementById("bloatedPrice").innerHTML;
    
        // Construct the message to send
        var msg = "New Order:%0AName: " + name + "%0AMobile Number: " + mobileNumber + "%0AAddress: " + address + ", " + brgy + ", " + city + ", " + province + ", " + region + ", " + country + "%0APostal Code: " + postalCode + "%0AShipping Notes: " + shippingNotes + "%0AProduct Name: " + productName + "%0AProduct Price: " + productPrice + "%0ABloated Price: " + bloatedPrice;
    
        // Send the message to Telegram
        var telegramUrl = "https://api.telegram.org/bot5319457642:AAFIlKkH6IsLqfUGd2RvI8GVBRtl_2FUaQE/sendMessage?chat_id=@BreakSoftOfficial&text=" + '"' + msg +'"';
    
        var xhr = new XMLHttpRequest();
        xhr.open('POST', telegramUrl);
        xhr.send();
    });

    // Add an event listener to the Cancel Order button to close the modal when clicked
    var closeButton = document.getElementById("cancelOrderButton")
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