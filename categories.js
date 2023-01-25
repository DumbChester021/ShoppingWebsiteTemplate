fetch('products.json')
    .then(response => response.json())
    .then(data => {
        let productsContainer = document.getElementById("productsContainer");

        let categories = new Set();
        data.products.forEach(product => {
            categories.add(product.category);
        });

        categories.forEach(category => {
            let categoryDiv = document.createElement("div");
            categoryDiv.classList.add("category");
            let row = document.createElement("div");
            row.classList.add("row");

            let categoryLabel = document.createElement("h2");
            categoryLabel.classList.add("category-label","pt-5");
            categoryLabel.innerHTML = category;
            categoryDiv.appendChild(categoryLabel);

            data.products.forEach(product => {
                if (product.category !== category) {
                    return;
                }

                let productId = product.id;
                let card = document.createElement("div");
                card.classList.add("card","col-12","col-sm-6","col-md-4","col-lg-3");
                //adding bootstrap grid classes to card

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
                button.addEventListener("click", function() {
                    window.location.href = "products.html?product=" + productId;
                });
                cardBody.appendChild(button);

                card.appendChild(cardBody);
                row.appendChild(card);
            });

            categoryDiv.appendChild(row);
            productsContainer.appendChild(categoryDiv);
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

var select = document.getElementById("categorySelect");

select.addEventListener("change", function() {

    let selectedCategory = this.value;
    console.log("The Selected Category:" + selectedCategory)
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
      let filteredProducts = data.products.filter(product => product.category.toLowerCase() === selectedCategory);
       // Filter products based on selected category
        console.log("filteredProducts: " + filteredProducts);
        let productsContainer = document.getElementById("productsContainer");
        productsContainer.innerHTML = "";
        // Create a new h2 element for the category label
        let categoryLabel = document.createElement("h2");
        categoryLabel.innerHTML = selectedCategory;

// Append the category label to the container
productsContainer.appendChild(categoryLabel);
        filteredProducts.forEach(product => {
            console.log("filtered Product: " + filteredProducts)
            let productId = product.id;
            let card = document.createElement("div");
            card.classList.add("card","col-12","col-sm-6","col-md-4","col-lg-3");
            //adding bootstrap grid classes to card

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
            button.addEventListener("click", function() {
                window.location.href = "products.html?product=" + productId;
            });
            cardBody.appendChild(button);

            card.appendChild(cardBody);
            productsContainer.appendChild(card);
        });
    });
});


