const urlParams = new URLSearchParams(location.search);
const productId = urlParams.get("product");

var productImg = document.getElementById("productImg");
var productName = document.getElementById("productName");
var orderName = document.getElementById("orderName");
var orderTotalPrice = document.getElementById("orderTotalPrice");
var productDescription = document.getElementById("productDescription");
var productPrice = document.getElementById("productPrice");
var bloatedPrice = document.getElementById("bloatedPrice");
var productQuantity = document.getElementById("inputQuantity");
var product;
var skuId = document.getElementById("skuId");
var hasColor = false;
var colorSelect = document.getElementById("color-select");
var orderColor = document.getElementById("orderColor");
var selectedColor;


readJson();

function readJson() {
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
        product = data.products.find(p => p.id == productId);
        if (product) {
            productImg.src = product.imgSrc;
            productName.innerHTML = product.name;
            orderName.innerHTML = "" + product.name + " x" + productQuantity.value;
            productDescription.textContent = product.description;
            productPrice.innerHTML = "₱" + product.price + ".00";
            bloatedPrice.innerHTML = "₱" + (product.price + ( product.price *  0.2 ));
            skuId.innerHTML = "SKU: JS-"+ product.id;
            if (product.colors && product.colors.length > 0) {
              hasColor = true;
              let colorSelect = document.getElementById("color-select");
              colorSelect.innerHTML = "";
              colorSelect.style.display = "block";
              colorSelect.selectedIndex = 0;
              product.colors.forEach(color => {
                  let option = document.createElement("option");
                  option.value = color;
                  option.text = color;
                  colorSelect.appendChild(option);
              });
          }else{
              document.getElementById("color-select").style.display = "none";
              document.getElementById("color-select-label").style.display = "none";
          }
            return product;
        }
    });
}


    //Listener for buy Button
    buyButton.addEventListener("click", function() {
      productQuantity = document.getElementById("inputQuantity");
      if (productQuantity.value < 1 == false) {
          productQuantity.innerHTML = 1;
      }
      // Add this check before displaying the modal
      if (isNaN(parseInt(productQuantity.value)) || parseInt(productQuantity.value) < 1 || parseInt(productQuantity.value) > 99) {
        // Check if there is already an alert displayed
        if (document.getElementById("alert-container-page").hasChildNodes()) {
            // Remove the old alert
            document.getElementById("alert-container-page").removeChild(document.getElementById("alert-container").firstChild);
        }
        //Create a new div element for the alert
        var alertDiv = document.createElement("div");
        //Add the Bootstrap class for a danger alert and fixed-top to the div
        alertDiv.classList.add("alert", "alert-danger","text-center","fixed-top");
        //Add the text of the alert to the div
        alertDiv.innerHTML = "Please enter a valid quantity between 1 and 99.";
        //Add the alert div to the page
        document.getElementById("alert-container-page").appendChild(alertDiv);
         // remove alert after 3 seconds
         setTimeout(function(){ 
            alertDiv.remove(); 
         }, 5000);
        return;
     }

      if (hasColor) {
        selectedColor = colorSelect.value;
        if(selectedColor !== "default" && selectedColor !== "Select a color") {
          orderColor.innerHTML = "Color:" + selectedColor;
        }  
      }
      orderName.innerHTML = "" + product.name + " x" + productQuantity.value;
      const totalPrice = (parseInt(product.price) * parseInt(productQuantity.value) );
      orderTotalPrice.innerHTML = "₱" + totalPrice + ".00";
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
        var now = new Date();
        var dateString2 = now.toLocaleDateString();
        var timeString3 = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        var orderNumber = generateRandomNumber();
        var quantity = parseInt(productQuantity.value)
        var totalPrice = (parseInt(product.price) * quantity )
        var orderColor;
        if (!hasColor) {
          orderColor = "N/A";
        }
        else {
          orderColor = selectedColor;
        }
        totalPrice = "₱" + totalPrice + ".00";
        

        // Construct the message to send
        var msg = "New Order Placed!:%0AOrder number:1870" + orderNumber + "%0ADate:" + dateString2 + "%0ATime:" + timeString3 + "%0AName: " + name + "%0AMobile Number: " + mobileNumber + "%0AAddress: " + address + ", " + brgy + ", " + city + ", " + province + ", " + region + ", " + country + "%0APostal Code: " + postalCode + "%0AShipping Notes: " + shippingNotes + "%0AProduct Name: " + productName + "%0AProduct Price: " + productPrice + "%0AQuantity:" + quantity + "%0AColor:" + orderColor + "%0ATotal Price:" + totalPrice;
    
        // Send the message to Telegram
        var telegramUrl = "https://api.telegram.org/bot5319457642:AAFIlKkH6IsLqfUGd2RvI8GVBRtl_2FUaQE/sendMessage?chat_id=@BreakSoftOfficial&text=" + '"' + msg +'"';
    
        var xhr = new XMLHttpRequest();
        xhr.open('POST', telegramUrl);
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Request was successful, display a message to the customer
                if (document.getElementById("alert-container-page").hasChildNodes()) {
                  // Remove the old alert
                  document.getElementById("alert-container-page").removeChild(document.getElementById("alert-container").firstChild);
                }
                //Create a new div element for the alert
                var alertDiv = document.createElement("div");
                //Add the Bootstrap class for a danger alert and fixed-top to the div
                alertDiv.classList.add("alert", "alert-success","text-center","fixed-top");
                //Add the text of the alert to the div
                alertDiv.innerHTML = "Your order has been placed successfully! We will contact you soon.";
                //Add the alert div to the page
                document.getElementById("alert-container-page").appendChild(alertDiv);
                // remove alert after 5 seconds
                setTimeout(function(){ 
                    alertDiv.remove(); 
                }, 5000);
            } else {
                // Request failed, display an error message
                if (document.getElementById("alert-container-modal").hasChildNodes()) {
                  // Remove the old alert
                  document.getElementById("alert-container-modal").removeChild(document.getElementById("alert-container").firstChild);
                }
                //Create a new div element for the alert
                var alertDiv = document.createElement("div");
                //Add the Bootstrap class for a danger alert and fixed-top to the div
                alertDiv.classList.add("alert", "alert-danger","text-center","fixed-top");
                //Add the text of the alert to the div
                alertDiv.innerHTML = "There was an error placing your order. Please try again later.";
                //Add the alert div to the page
                document.getElementById("alert-container-modal").appendChild(alertDiv);
                // remove alert after 5 seconds
                setTimeout(function(){ 
                    alertDiv.remove(); 
                }, 5000);
            }
            // Close the modal after the request is complete
            shippingModal.classList.remove("show");
            shippingModal.style.display = "none";
        }
        // Add this check before sending the request
        if (!name || !mobileNumber || !address || !brgy || !city || !province || !region || !country || !postalCode) {
          //Create a new div element for the alert
          if (document.getElementById("alert-container-modal").hasChildNodes()) {
            // Remove the old alert
            document.getElementById("alert-container-modal").removeChild(document.getElementById("alert-container").firstChild);
          }
          var alertDiv = document.createElement("div");
          //Add the Bootstrap class for a danger alert and fixed-top to the div
          alertDiv.classList.add("alert", "alert-danger","text-center","fixed-top");
          //Add the text of the alert to the div
          alertDiv.innerHTML = "Please fill out all the required fields.";
          //Add the alert div to the page
          document.getElementById("alert-container-modal").appendChild(alertDiv);
          // remove alert after 5 seconds
          setTimeout(function(){ 
              alertDiv.remove(); 
          }, 5000);
          return;
        }

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

        // Function to generate a random 12-digit number
    function generateRandomNumber() {
      let array = new Uint32Array(3);
      window.crypto.getRandomValues(array);
      return array.join("").substring(0, 12);
    }