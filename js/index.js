import products from '../data.js';

const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const burgerMenuIcon = document.querySelector('.menu-hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const menuCartIcon = document.querySelector('.navbar-shoping-cart');
const asideCartList = document.querySelector('.product-detail-shopping-cart');
const cardContainer = document.querySelector('.cards-container');
const asideProductDetail = document.querySelector('.aside-product-detail');
const closeProductDetail = document.querySelector('.product-detail-close');

function toggleItem(showElement, hideElement1, hideElement2, hideElement3) {
  showElement.classList.toggle('inactive');
  hideElement1?.classList.add('inactive');
  hideElement2?.classList.add('inactive');
  hideElement3?.classList.add('inactive');
}
function openAsideProductDetail(
  openElement,
  hideElement1,
  hideElement2,
  hideElement3
) {
  openElement.classList.remove('inactive');
  hideElement1?.classList.add('inactive');
  hideElement2?.classList.add('inactive');
  hideElement3?.classList.add('inactive');
}
function closeAsideProductDetail(closeElement) {
  closeElement.classList.add('inactive');
}

menuEmail.addEventListener('click', () =>
  toggleItem(desktopMenu, asideCartList, mobileMenu, asideProductDetail)
);
burgerMenuIcon.addEventListener('click', () =>
  toggleItem(mobileMenu, asideCartList, desktopMenu, asideProductDetail)
);
menuCartIcon.addEventListener('click', () =>
  toggleItem(asideCartList, desktopMenu, mobileMenu, asideProductDetail)
);
closeProductDetail.addEventListener('click', () => {
  closeAsideProductDetail(asideProductDetail);
});

// index products

function renderProducts(arr) {
  for (let product of arr) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImg = document.createElement('img');
    productImg.setAttribute('src', product.images[0]);
    productImg.setAttribute('alt', product.title);
    productImg.addEventListener('click', () =>
      openAsideProductDetail(
        asideProductDetail,
        desktopMenu,
        asideCartList,
        mobileMenu
      )
    );

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const productInfoDiv = document.createElement('div');
    const productPrice = document.createElement('p');
    productPrice.innerText = `$${product.price}`;
    const productName = document.createElement('p');
    productName.innerText = `${product.title}`;

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
}

const URL = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=75';

async function fetchData(uri) {
  try {
    const response = await fetch(uri);
    const data = await response.json();
    renderProducts(data);
  } catch (error) {
    console.log(error);
  }
}
fetchData(URL);
