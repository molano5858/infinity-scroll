const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
const imagen1 =
  "https://images.pexels.com/photos/18421397/pexels-photo-18421397/free-photo-of-skogafoss-islandia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const imagen2 =
  "https://images.pexels.com/photos/18138560/pexels-photo-18138560/free-photo-of-islandia-montanas-naturaleza-punto-de-referencia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

let photosArray = [
  {
    url: imagen1,
  },
  {
    url: imagen1,
  },
  {
    url: imagen1,
  },
  {
    url: imagen1,
  },
];
let readyToLoadMore = false;
let imagesLoaded = 0;
let totalImages = 0;

// check if the image loaded already
function imgLoaded() {
  console.log("La imagen ya cargo");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    readyToLoadMore = true;
    loader.hidden = true;
    console.log("ready =", readyToLoadMore);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.url);
    item.setAttribute("terget", "_blank");
    const img = document.createElement("img");
    img.setAttribute("src", photo.url);
    img.setAttribute("alt", "hola bebe que mas pues ");
    img.setAttribute("title", "hola bebe que mas pues ");
    item.appendChild(img);
    imageContainer.append(item);
    img.addEventListener("load", imgLoaded);
  });
}

function displayNewPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  let ultimosCuatroElementos = photosArray.slice(-4);
  ultimosCuatroElementos.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.url);
    item.setAttribute("terget", "_blank");
    const img = document.createElement("img");
    img.setAttribute("src", photo.url);
    img.setAttribute("alt", "hola bebe que mas pues ");
    img.setAttribute("title", "hola bebe que mas pues ");
    item.appendChild(img);
    imageContainer.append(item);
    img.addEventListener("load", imgLoaded);
  });
}

function cargarMasFotos() {
  console.log("cargar mas fotos bebe");

  for (let i = 0; i < 4; i++)
    photosArray.push({
      url: imagen2,
    });
  console.log(photosArray);
  displayNewPhotos();
}

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const margen = 100;
  if (scrollY + windowHeight >= documentHeight - margen) {
    cargarMasFotos();
  }
});

displayPhotos();
