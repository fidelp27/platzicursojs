import { registerImage } from './lazy.js';
const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const burgerMenuIcon = document.querySelector('.menu-hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const menuCartIcon = document.querySelector('.navbar-shoping-cart');
const asideCartList = document.querySelector('.product-detail-shopping-cart');
const cardContainer = document.querySelector('.cards-container');
const asideProductDetail = document.querySelector('.aside-product-detail');
const closeProductDetail = document.querySelector('.product-detail-close');
let arrayShoppingCartProducts = [];

// funciones toggle menu elements

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

// render products

function renderProducts(arr) {
  console.log(arr);
  for (let product of arr) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.setAttribute('id', product.id);

    const productImg = document.createElement('img');
    productImg.dataset.src = product.images[0].startsWith('http')
      ? product.images[0]
      : 'https://i.imgur.com/8rv6TNy.jpg';

    productImg.setAttribute('alt', product.title);

    productImg.classList.add('bg-image');
    productImg.addEventListener('click', () => {
      openAsideProductDetail(
        asideProductDetail,
        desktopMenu,
        asideCartList,
        mobileMenu
      );
    });

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const productInfoDiv = document.createElement('div');
    const productPrice = document.createElement('p');
    productPrice.setAttribute('class', 'product-price');
    productPrice.innerText = `$${product.price}`;
    const productName = document.createElement('p');
    productName.setAttribute('class', 'product-name');
    productName.innerText = `${product.title}`;

    productInfoDiv.appendChild(productPrice);
    productInfoDiv.appendChild(productName);

    const productInfoFigure = document.createElement('figure');
    const productImgCart = document.createElement('img');
    productImgCart.setAttribute('src', './assets/icons/bt_add_to_cart.svg');
    productImgCart.setAttribute('alt', 'cart-icon');
    productImgCart.addEventListener('click', addCiclkedProduct);

    productInfoFigure.appendChild(productImgCart);
    productInfo.append(productInfoDiv, productInfoFigure);
    productCard.append(productImg, productInfo);
    registerImage(productImg);

    cardContainer.append(productCard);
  }
}
// call API
const URL = 'https://api.escuelajs.co/api/v1/products?offset=25&limit=200';

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

// Agregar al carrito

function addCiclkedProduct(e) {
  const button = e.target;
  const item = button.closest('.product-card');
  const title = item.querySelector('.product-name').textContent;
  const img = item.querySelector('.bg-image');
  const imgSrc = img.getAttribute('src');
  const price = item.querySelector('.product-price').textContent;
  const qtyProducts = document.querySelector('.qty-product');

  const productExist = arrayShoppingCartProducts.findIndex(
    (elem) => elem.title === title
  );

  productExist === -1 &&
    arrayShoppingCartProducts.push({
      img: imgSrc,
      title: title,
      price: price,
      qty: 1,
    });
  renderProductToShoppingCart(arrayShoppingCartProducts);
}

function renderProductToShoppingCart(array) {
  const shoppingContainer = document.querySelector('.my-order-content');
  shoppingContainer.textContent = '';
  array.forEach((elem) => {
    const shoppingCartContainer = document.createElement('div');
    shoppingCartContainer.setAttribute(
      'class',
      'shopping-cart shopping-cart-container'
    );
    const figure = document.createElement('figure');
    const productImage = document.createElement('img');
    productImage.setAttribute('src', elem.imgSrc);
    productImage.setAttribute('alt', elem.title);
    figure.appendChild(productImage);

    const titleProduct = document.createElement('p');
    titleProduct.setAttribute('class', 'title-product');
    titleProduct.textContent = elem.title;

    const priceProduct = document.createElement('p');
    priceProduct.setAttribute('class', 'price-product');
    priceProduct.textContent = elem.price;

    const iconDeleteProduct = document.createElement('img');
    iconDeleteProduct.setAttribute('src', './assets/icons/icon_close.png');
    iconDeleteProduct.setAttribute('alt', 'closeIcon');
    iconDeleteProduct.setAttribute('class', 'closeIcon');

    shoppingCartContainer.append(
      figure,
      titleProduct,
      priceProduct,
      iconDeleteProduct
    );
    shoppingContainer.append(shoppingCartContainer);
  });

  totalAmount(array);
  totalProductsCart(array);
  deleteProducts(array);
}

function totalAmount(array) {
  const total = document.querySelector('.total');
  const arrayPrice = [];
  array.map((elem) => arrayPrice.push(elem.price.slice(1)));
  const totalAmount = arrayPrice.reduce((a, b) => Number(a) + Number(b), 0);
  total.textContent = `$${totalAmount}`;
}

function totalProductsCart(array) {
  const totalItemsMenu = document.querySelector('.total-items');
  const totalProducts = array.length;
  totalItemsMenu.textContent = totalProducts;
}

function deleteProducts(arr) {
  const botones = document.querySelectorAll('.closeIcon');
  let newArr = [];
  botones.forEach((elem) =>
    elem.addEventListener('click', (e) => {
      const boton = e.target;
      const item = boton.closest('.shopping-cart-container');
      const title = item.querySelector('.title-product').textContent;
      newArr = arr.filter((elem) => elem.title !== title);
      renderProductToShoppingCart(newArr);
      arrayShoppingCartProducts = [...newArr];
    })
  );
  return;
}
// render product detail
