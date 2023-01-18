const product1Button = document.getElementById("product1Button");
const product2Button = document.getElementById("product2Button");
const product3Button = document.getElementById("product3Button");
const product4Button = document.getElementById("product4Button");

product1Button.addEventListener("click", () => {
  window.location.href = "products.html?product=1&name=Barley+Capsule";
});

product2Button.addEventListener("click", () => {
  window.location.href = "products.html?product=2&name=Fusion+Coffee";
});

product3Button.addEventListener("click", () => {
  window.location.href = "products.html?product=3&name=Boost+Coffee";
});

product4Button.addEventListener("click", () => {
  window.location.href = "products.html?product=4&name=Barley+Powder";
});
