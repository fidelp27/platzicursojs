const total = 0;

// recibe un entry y se pasa la propuedad isIntersecting para saber si está dentro de la pantalla
const isIntersecting = (entry) => entry.isIntersecting;

const loadImage = (entry) => {
  //Obtenemos el nodo de lo que estamos viendo y se lo pasamos al unobserve para que deje de observar ese elemento en específico
  const imageCard = entry.target;
  const url = imageCard.dataset.src;
  imageCard.src = url;

  //Cada vez que se vea la imagen, se le pide que deje de hacerlo para no cargar la misma acción cada vez que hago scroll
  observer.unobserve(imageCard);
};

// Para usar la API, recibe una función que indica qué hacer por cada imagen. Pasa todas las entradas que está viendo
const observer = new IntersectionObserver((entries) => {
  // se filtra el array de entradas y se filtra solo por las imagenes y por cada imagen que ve, se pide que haga una acción
  entries.filter(isIntersecting).forEach(loadImage);
});
// Le pedimos que observe la imagen
export const registerImage = (image) => {
  observer.observe(image);
};

// Continuación
// Se exporta el método para observar las imagenes
//registerImage(productImg) en la función que crea y muestra la imagen
//Última etapa:
//Si no queremos que la imagen cargue, eliminamos el src cuando se crea y lo pasamos al lazy loading en la acción a realizar
//Forma 1: se pasa la creación del src a la acción jugando con el entry.target para asignar el atributo
//Forma 2: usando dataset para pasar el src como propiedad y utilizarlo cuando deseemos (ver código en index.js

// productImg.dataset.src = product.images[0].startsWith('http')
//       ? product.images[0]
//       : 'https://i.imgur.com/8rv6TNy.jpg';
// )

//Luego en la acción loadImage: tomo la url que está como propiedad
// const url = imageCard.dataset.src;
