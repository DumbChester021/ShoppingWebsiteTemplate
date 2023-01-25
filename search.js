//Listener for the SearchBar
document.addEventListener("DOMContentLoaded", function() {
    let searchForm = document.querySelector("searchBtn");
    searchBtn.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("Clicked Search")
        searchProducts();
    });
  });
  //Search Data Function
  function searchProducts() {
    let searchInput = document.querySelector("input[type=search]");
    let searchQuery = searchInput.value.toLowerCase();
    if (searchQuery == "") {
      return;
    }
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            let searchResults = data.products.filter(product => {
                return product.name.toLowerCase().includes(searchQuery);
            });
            
            console.log("Now searching the JSON File")
            displaySearchResults(searchResults,searchQuery);
        });
  }
  
  //Function Show Results
  function displaySearchResults(searchResults, searchedQuery) {
    console.log("Now Trying to Display Results")
      let productsContainer = document.getElementById("productsContainer");
      productsContainer.innerHTML = ""; // clear the previous products
    searchResults.forEach(product => {
        let productId = product.id;
        let col = document.createElement("div");
        col.classList.add("col", "py-2");
  
        let card = document.createElement("div");
        card.classList.add("card");
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
        col.appendChild(card);
        productsContainer.appendChild(col);
        let resultLabel = document.getElementById("resultLabel")
  
    });
    
    window.scrollTo(0, resultLabel.offsetTop);
    console.log("Results for :" + searchedQuery + "\l\nDisplaying Result length:" + searchResults.length);
    if(searchResults.length === 0) {
      resultLabel.innerHTML = "No results found for '" + searchedQuery + "'";
      if (window.location.pathname === "/categories.html") {
        categoriesLabel.innerHTML = "";
    }
    
    }
    else {
      resultLabel.innerHTML = "Displaying results for '" + searchedQuery + "'";
      if (window.location.pathname === "/categories.html") {
        categoriesLabel.innerHTML = "";
    }
    
          }
  }