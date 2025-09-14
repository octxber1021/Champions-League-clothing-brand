// --- CART.JS ---
// Load cart count everywhere
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + item.quantity, 0);
  let cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.innerText = count;
  }
}

// Add item to cart
function addToCart(name, price, image, quantityId) {
  let quantity = parseInt(document.getElementById(quantityId).value);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, image, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Item added to cart!");
}

// Load cart items on cart.html
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsDiv = document.getElementById("cart-items");
  let total = 0;

  if (!cartItemsDiv) return; // only run on cart.html

  cartItemsDiv.innerHTML = "";
  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="100">
        <p><strong>${item.name}</strong></p>
        <p>R${item.price} x ${item.quantity}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: R" + total;
}

// Remove an item from cart
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

// Checkout via WhatsApp
function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hello, I want to order:%0A";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    message += `${item.name} - R${item.price} x ${item.quantity}%0A`;
  });

  message += `%0ATotal: R${total}`;
  let phone = "27768115597"; // Replace with brand owner's number
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

// Run on page load
window.onload = function() {
  updateCartCount();
  loadCart();
};