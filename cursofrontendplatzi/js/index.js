const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const burgerMenuIcon = document.querySelector('.menu-hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const menuCartIcon = document.querySelector('.navbar-shoping-cart');
const asideCartList = document.querySelector('.product-detail-shopping-cart');

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
