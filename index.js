fetch('products.json')
    .then(response => response.json())
    .then(data => {
        let productsContainer = document.getElementById("productsContainer");
        data.products.forEach(product => {

            let productId = product.id;
            console.log("ProductID is:" + productId);

            let col = document.createElement("div");
            col.classList.add("col","py-2");

            let card = document.createElement("div");
            card.classList.add("card","ps-sm-5","ps-md-0");
            card.style.width = "18rem";
            
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
            
            let productDescription = document.createElement("p");
            productDescription.classList.add("card-text");
            productDescription.innerHTML = product.description;
            cardBody.appendChild(productDescription);
            
            let button = document.createElement("button");
            button.type = "button";
            button.classList.add("btn", "btn-primary");
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
