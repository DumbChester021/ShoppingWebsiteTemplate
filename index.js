const card1Button = document.getElementById("product1Button");
const card2Button = document.getElementById("product2Button");
const card3Button = document.getElementById("product3Button");
const card4Button = document.getElementById("product4Button");

card1Button.addEventListener("click", () => {
  window.location.href = "products.html?product=1";
});

card2Button.addEventListener("click", () => {
  window.location.href = "products.html?product=2";
});

card3Button.addEventListener("click", () => {
  window.location.href = "products.html?product=3";
});

card4Button.addEventListener("click", () => {
  window.location.href = "products.html?product=4";
});
