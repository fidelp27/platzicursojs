import products from '../data.js';

const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const burgerMenuIcon = document.querySelector('.menu-hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const menuCartIcon = document.querySelector('.navbar-shoping-cart');
const asideCartList = document.querySelector('.product-detail-shopping-cart');
const cardContainer = document.querySelector('.cards-container');

const toggleItem = (showElement, hideElement1, hideElement2) => {
  showElement.classList.toggle('inactive');
  hideElement1?.classList.add('inactive');
  hideElement2?.classList.add('inactive');
};

menuEmail.addEventListener('click', () =>
  toggleItem(desktopMenu, asideCartList, mobileMenu)
);
burgerMenuIcon.addEventListener('click', () =>
  toggleItem(mobileMenu, asideCartList, desktopMenu)
);
menuCartIcon.addEventListener('click', () =>
  toggleItem(asideCartList, desktopMenu, mobileMenu)
);

// index products

const renderPRoducts = (arr) => {
  for (let product of arr) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImg = document.createElement('img');
    productImg.setAttribute('src', product.image);
    productImg.setAttribute('alt', product.name);

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const productInfoDiv = document.createElement('div');
    const productPrice = document.createElement('p');
    productPrice.innerText = `$${product.price}`;
    const productName = document.createElement('p');
    productName.innerText = `${product.name}`;

    productInfoDiv.appendChild(productPrice);
    productInfoDiv.appendChild(productName);

    const productInfoFigure = document.createElement('figure');
    const productImgCart = document.createElement('img');
    productImgCart.setAttribute('src', './assets/icons/bt_add_to_cart.svg');
    productImgCart.setAttribute('alt', 'cart-icon');

    productInfoFigure.appendChild(productImgCart);
    productInfo.append(productInfoDiv, productInfoFigure);
    productCard.append(productImg, productInfo);

    cardContainer.append(productCard);
  }
};
renderPRoducts(products);
