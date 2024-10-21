const food = [
    {
       "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
       },
       "name": "Waffle with Berries",
       "category": "Waffle",
       "price": 6.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
     }
]

// Sélectionnez les éléments du DOM
const foodCardContainer = document.querySelector('.food-card-container');
const cartQuantity = document.getElementById('quantity');
const emptyCart = document.querySelector('.empty-cart');
const carbonNeutral = document.querySelector('.carbon-neutral');
const addedItems = document.querySelector('.added-items');
const orderTotal = document.querySelector('.order-total .total');
const orderTotalTotal = document.querySelector('.order-total');
const buttonConfirmOrder = document.querySelector('.button-confirm-order');

// Initialiser le panier
let cart = [];

// Fonction pour créer une carte de nourriture
function createFoodCard(item) {
  const card = document.createElement('div');
  card.className = 'food-card';
  
  card.innerHTML = `
    <div class="food-card-block-img">
      <picture class="food-card-img">
        <source media="(min-width: 1024px)" srcset="${item.image.desktop}">
        <source media="(min-width: 768px)" srcset="${item.image.tablet}">
        <source media="(max-width: 767px)" srcset="${item.image.mobile}">
        <img class="food-card-img-img" src="${item.image.desktop}" alt="${item.name}">
      </picture>
      <button class="food-card-button">
        <img src="./assets/images/icon-add-to-cart.svg" alt="">
        <div>Add to cart</div>
      </button>
      <button class="food-card-button-added" style="display: none;">
        <div class="minus"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg></div>
        <p class="count">0</p>
        <div class="plus"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg></div>
      </button>
    </div>
    <div class="food-card-content">
      <p class="sub-title">${item.category}</p>
      <p class="title">${item.name}</p>
      <p class="price">$${item.price.toFixed(2)}</p>
    </div>
  `;
  
  const addButton = card.querySelector('.food-card-button');
  const quantityButton = card.querySelector('.food-card-button-added');
  const minusButton = quantityButton.querySelector('.minus');
  const plusButton = quantityButton.querySelector('.plus');
  const countElement = quantityButton.querySelector('.count');
  
  addButton.addEventListener('click', () => {
    addButton.style.display = 'none';
    quantityButton.style.display = 'flex';
    updateCart(item, 1);
  });
  
  minusButton.addEventListener('click', () => {
    const currentCount = parseInt(countElement.textContent);
    if (currentCount > 1) {
      updateCart(item, currentCount - 1);
    } else {
      addButton.style.display = 'flex';
      quantityButton.style.display = 'none';
      updateCart(item, 0);
    }
  });
  
  plusButton.addEventListener('click', () => {
    const currentCount = parseInt(countElement.textContent);
    updateCart(item, currentCount + 1);
  });
  
  return card;
}

// Fonction pour mettre à jour le panier
function updateCart(item, quantity) {
  const existingItem = cart.find(cartItem => cartItem.name === item.name);
  
  if (existingItem) {
    existingItem.quantity = quantity;
    if (quantity === 0) {
      cart = cart.filter(cartItem => cartItem.name !== item.name);
    }
  } else if (quantity > 0) {
    cart.push({ ...item, quantity });
  }
  
  updateCartDisplay();
}

// Fonction pour mettre à jour l'affichage du panier
function updateCartDisplay() {
  cartQuantity.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  
  if (cart.length === 0) {
    emptyCart.style.display = 'block';
    orderTotalTotal.style.display = 'none';
    buttonConfirmOrder.style.display = 'none';
    carbonNeutral.style.display = 'none';
    addedItems.innerHTML = '';
    orderTotal.textContent = '$0.00';
  } else {
    emptyCart.style.display = 'none';
    orderTotalTotal.style.display = 'flex';
    carbonNeutral.style.display = 'flex';
    buttonConfirmOrder.style.display = 'block';
    addedItems.innerHTML = '';
    
    let total = 0;
    cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'item';
      itemElement.innerHTML = `
        <div class="item-left-part">
          <p>${item.name}</p>
          <div class="item-numbers">
            <div class="number"><span class="count">${item.quantity}</span>x</div>
            <div class="price-unit">@$${item.price.toFixed(2)}</div>
            <div class="price-global">$${(item.price * item.quantity).toFixed(2)}</div>
          </div>
        </div>
        <button class="delete-item"></button>
      `;
      
      const deleteButton = itemElement.querySelector('.delete-item');
      deleteButton.addEventListener('click', () => {
        updateCart(item, 0);
        const foodCard = document.querySelector(`.food-card:has(.title:contains("${item.name}"))`);
        if (foodCard) {
          foodCard.querySelector('.food-card-button').style.display = 'flex';
          foodCard.querySelector('.food-card-button-added').style.display = 'none';
          foodCard.querySelector('.count').textContent = '0';
        }
      });
      
      addedItems.appendChild(itemElement);
      total += item.price * item.quantity;
    });
    
    orderTotal.textContent = `$${total.toFixed(2)}`;
  }
  
  // Mettre à jour l'affichage des quantités sur les cartes
  document.querySelectorAll('.food-card').forEach(card => {
    const title = card.querySelector('.title').textContent;
    const cartItem = cart.find(item => item.name === title);
    const countElement = card.querySelector('.count');
    const addButton = card.querySelector('.food-card-button');
    const quantityButton = card.querySelector('.food-card-button-added');
    
    if (cartItem) {
      countElement.textContent = cartItem.quantity;
      addButton.style.display = 'none';
      quantityButton.style.display = 'flex';
    } else {
      countElement.textContent = '0';
      addButton.style.display = 'flex';
      quantityButton.style.display = 'none';
    }
  });
}

// Créer les cartes de nourriture
food.forEach(item => {
  const card = createFoodCard(item);
  foodCardContainer.appendChild(card);
});

// Initialiser l'affichage du panier
updateCartDisplay();