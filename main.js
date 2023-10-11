const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];

let readyToLoadMore = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 8;
const apiKey = "PHwnFg79L4CE2Efnz93Q-n0FSB-oAgcmqX5ImGozWCc";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// check if img is loaded
function imgLoaded() {
  console.log("image is loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    readyToLoadMore = true;
    loader.hidden = true;
    console.log("ready =", readyToLoadMore);
  }
}

// Don´t repeat yourself => setAttribute
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements to add to the DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // go through each element
  photosArray.forEach((photo) => {
    // Create <a> element to link to Unsplash
    const item = document.createElement("a");

    // item.setAttribute("href", photo.links.html); replaced by function setAttributes()
    // item.setAttribute("target", "_blank");replaced by function setAttributes()

    setAttributes(item, { href: photo.links.html, target: "_blank" });
    // Create <img>
    const img = document.createElement("img");
    //img.setAttribute("src", photo.urls.regular);replaced by function setAttributes()
    //img.setAttribute("alt", photo.alt_description);replaced by function setAttributes()
    //img.setAttribute("title", photo.alt_description);replaced by function setAttributes()
    setAttributes(img, {
      src: photo.urls.small,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // put img inside a
    item.appendChild(img);
    // put both inside container
    imageContainer.append(item);

    // checking if every photo is loaded
    img.addEventListener("load", imgLoaded);
  });
}

// Get photos from unsplash SPI

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// checking scroll near bottom of the page to load more photos

// first way infinite scroll
// let currentPosition = 0;
// window.addEventListener("scroll", () => {
//   let myScroll = window.scrollY;
//   let heightWindow = window.innerHeight;
//   if (myScroll > heightWindow - 200) {
//     console.log(myScroll);
//     getPhotos();
//   }
//   currentPosition = myScroll;
// });

// second way infinite scroll
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    readyToLoadMore
  ) {
    readyToLoadMore = false;
    getPhotos();
  }
});

// onLoad
getPhotos();
