fetch('products.json')
    .then(response => response.json())
    .then(data => {
        let productsContainer = document.getElementById("productsContainer");
        let row = document.createElement("div");
        row.classList.add("row");
        data.products
            .filter(product => product.featured === true)
            .sort((a, b) => a.priority - b.priority)
            .forEach(product => {

            let productId = product.id;

            let col = document.createElement("div");
            col.classList.add("col-lg-3","col-md-4","col-sm-8","py-2");

            let card = document.createElement("div");
            card.classList.add("card");
            
            let img = document.createElement("img");
            img.src = product.imgSrc;
            img.classList.add("card-img-top");
            img.alt = product.name;
            card.appendChild(img);


            
            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            
            let productName = document.createElement("h5");
            productName.classList.add("card-title");
            productName.innerHTML = product.name;
            cardBody.appendChild(productName);

            let productPrice = document.createElement("p");
            productPrice.classList.add("card-text");
            productPrice.innerHTML = "₱" + product.price + ".00";
            cardBody.appendChild(productPrice);
            
            let button = document.createElement("button");
            button.type = "button";
            button.classList.add("btn", "btn-success");
            button.innerHTML = "View Product";
            button.addEventListener("click", function(){
              window.location.href = "products.html?product="+productId; 
            });
            cardBody.appendChild(button);
            
            card.appendChild(cardBody);
            col.appendChild(card);
            productsContainer.appendChild(col);
        });
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

let shopNowButton = document.getElementById("shopNowButton");
shopNowButton.addEventListener("click", function() {
    window.location.href = "shop.html";
});


