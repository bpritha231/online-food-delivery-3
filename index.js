// Cart array to hold selected items
let cart = [];

// Filter items based on category
function filterItems(category) {
  const items = document.querySelectorAll('.food-card');
  items.forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

// Attach event listeners to category buttons
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category');
    filterItems(category);
  });
});

// Attach event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.food-card');
    const id = card.getAttribute('data-id');
    const name = card.getAttribute('data-name');
    const price = parseFloat(card.getAttribute('data-price'));
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    updateCartCount();
  });
});


// Update cart count display
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').innerText = count;
}

// Modal handling
const cartModal = document.getElementById('cartModal');
const viewCartBtn = document.getElementById('viewCartBtn');
const closeCartBtn = document.getElementById('closeCart');
viewCartBtn.onclick = () => {
  renderCart();
  cartModal.style.display = 'block';
};
closeCartBtn.onclick = () => {
  cartModal.style.display = 'none';
};
window.onclick = (event) => {
  if (event.target == cartModal) {
    cartModal.style.display = 'none';
  }
};

// Render cart items
function renderCart() {
  const cartDiv = document.getElementById('cartItems');
  cartDiv.innerHTML = '';
  if (cart.length === 0) {
    cartDiv.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('totalBill').innerText = 'Total: ₹0.00';
    document.getElementById('address').value = '';
    return;
  }
  let total = 0;
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    const info = document.createElement('div');
    info.innerText = `${item.name} x${item.quantity}`;
    const priceDiv = document.createElement('div');
    const totalPrice = item.price * item.quantity;
    priceDiv.innerText = `₹${totalPrice.toFixed(2)}`;
    total += totalPrice;
    // Add remove button
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.onclick = () => {
      removeItem(index);
    };
    div.appendChild(info);
    div.appendChild(priceDiv);
    div.appendChild(removeBtn);
    cartDiv.appendChild(div);
  });
  // Update total bill display
  document.getElementById('totalBill').innerText = `Total: ₹${total.toFixed(2)}`;
}

// Remove item from cart
function removeItem(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}

// Handle checkout
document.getElementById('checkoutBtn').onclick = () => {
  const address = document.getElementById('address').value.trim();
  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }
  if (address === '') {
    alert('Please enter your delivery address.');
    return;
  }
  const totalText = document.getElementById('totalBill').innerText;
  alert(`Thank you for your order!\n${totalText}\nDelivery Address: ${address}`);
  // Clear cart and reset
  cart = [];
  updateCartCount();
  renderCart();
  document.getElementById('cartModal').style.display = 'none';
};
// pop up

  const addButtons = document.querySelectorAll('.add-btn');
  const popup = document.getElementById('popup-message');

  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      popup.style.display = 'block';

      // Reset animation
      popup.classList.remove('fade');
      void popup.offsetWidth; // Trigger reflow
      popup.classList.add('fade');

      // Hide after 2 seconds
      setTimeout(() => {
        popup.style.display = 'none';
      }, 1000);
    });
  });


// slideshow
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
  slides.forEach((slide) => {
    slide.style.display = 'none';
  });
  slides[n].style.display = 'block';
}

function nextSlide() {
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  showSlide(slideIndex);
}

showSlide(slideIndex);
setInterval(nextSlide, 5000);