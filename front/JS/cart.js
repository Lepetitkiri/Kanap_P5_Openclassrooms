/* JS page linked to cart.html */

/* Fonction de récupération des données depuis le local storage */
function getAllDatasFromLocalStorage() {
  let arrayOfAllDatasFromLocalStorage = []; /* Création d'un array pour accueillir les données du panier */

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); /* Récupération de l'ensemble des clés contenues dans le local storage */
    const keySplited = key.split(' '); /* Séparation de la clé en deux string */
    
    /* Stockage des id, couleurs et quantités existantes dans des constantes */
    const idInTheLocalStorage = keySplited[0];
    const colorInTheLocalStorage =  keySplited[1];
    const quantityInTheLocalStorage = JSON.parse(localStorage.getItem(key));

    /* Création d'un objet pour chaque element contenu dans le local storage */
    objectInTheLocalStorage = {
    "color": colorInTheLocalStorage,
    "_id": idInTheLocalStorage,
    "name": "",
    "price": "",
    "imageUrl": "",
    "description": "",
    "altTxt": "",
    "quantity": quantityInTheLocalStorage
    };
    arrayOfAllDatasFromLocalStorage.push(objectInTheLocalStorage); /* Stockage des infos dans l'array créé en début de fonction */
  }
  return arrayOfAllDatasFromLocalStorage;
};

const cart = getAllDatasFromLocalStorage();



/* Récupération des infos des produits du cart depuis l'API : */
const allIdFromCartWithDuplicate = cart.map( cart => cart._id); /* création d'une map pour récupérer tous les id du cart */
let allIdFromCart = [...new Set(allIdFromCartWithDuplicate)]; /* Suppression des doublons grace à la class Set */

const productPromises = [];
for ( i = 0 ; i < allIdFromCart.length; i++ ) {
    product = fetch(`http://localhost:3000/api/products/${allIdFromCart[i]}`)
    .then(response => response.json())
    productPromises.push(product);
  }

  Promise.all(productPromises)
  .then(response => {informationsCompilationFromApiandCart(response)})
  .then (cartCompleted => displayProducts(cartCompleted));



/* Fonction permettant de remplir les infos manquantes de cart depuis l'api */
let cartCompleted = [];

function informationsCompilationFromApiandCart(product) {

  for ( i = 0 ; i < cart.length; i++ ) {
    
    if (cart[i]._id === product[i]._id) {
      cart[i].name = product[i].name;
      cart[i].price = product[i].price;
      cart[i].imageUrl = product[i].imageUrl;
      cart[i].description = product[i].description;
      cart[i].altTxt = product[i].altTxt;
    } else {
      cart[i].name = "Données manquantes";
      cart[i].price = "Données manquantes";
      cart[i].imageUrl = "Données manquantes";
      cart[i].description = "Données manquantes";
      cart[i].altTxt = "Données manquantes";
    }
    cartCompleted.push(cart[i]);
  }
};


/* ATTENTION PB OBJETS MULTIPLES A REGLER */

/* Insertion des datas du produit sélectionné dans la page */
function displayProducts(cart) {

 for ( i = 0 ; i < cartCompleted.length; i++ ) {
    
  /* Création d'un <article> contenant les infos produit */
  let productArticle = document.createElement("article");
  document.getElementById(`cart__items`).appendChild(productArticle);
  productArticle.classList.add(`cart__item`);
  productArticle.setAttribute("class", "cart__item");
  productArticle.setAttribute("class", `data-id=product-${cartCompleted[i]._id}`);
  productArticle.setAttribute("class", `data-color=product-${cartCompleted[i].color}`);

  /* Création d'une <div class="cart__item__img"> dans l'<article> */
  let divArticle = document.createElement("div");
  productArticle.appendChild(divArticle);
  divArticle.classList.add("cart__item__img");

  /* Création d'une <img> contenant les infos produit */
  let imgArticle = document.createElement("img");
  /*let divArticle = document.querySelector(".cart__item__img");*/
  divArticle.appendChild(imgArticle);
  imgArticle.src = cartCompleted[i].imageUrl;
  imgArticle.alt = cartCompleted[i].altTxt;

  /* Creation d'une <div class="cart__item__content"> dans l'<article> */
  let divArticle2 = document.createElement("div");
  productArticle.appendChild(divArticle2);
  divArticle2.classList.add("cart__item__content");

  /* Creation d'une <div class="cart__item__content__description"> dans la <div class="cart__item__content"> */
  let divArticle3 = document.createElement("div");
  divArticle3.classList.add("cart__item__content__description");
  divArticle2.appendChild(divArticle3);
  divArticle3.innerHTML = `<h2>${cartCompleted[i].name}</h2> <p> ${cartCompleted[i].color}</p> <p>${cartCompleted[i].price}</p>`;

  /* Creation d'une <div class="cart__item__content__settings"> dans la <div class="cart__item__description"> */
  let divArticle4 = document.createElement("div");
  divArticle2.appendChild(divArticle4);
  divArticle4.classList.add("cart__item__content__settings");

  /* Creation d'une <div class="cart__item__content__settings"__quantity> dans la <div class="cart__item__content__settings"> */
  let divArticle5 = document.createElement("div");
  divArticle4.appendChild(divArticle5);
  divArticle5.classList.add("cart__item__content__settings__quantity");

  let pArticle = document.createElement("p");
  divArticle5.appendChild(pArticle);
  pArticle.innerText = `Qté : `;
  divArticle5.innerHTML = `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartCompleted[i].quantity}">`;

  /* Creation d'une <div class="cart__item__content__settings"__delete> dans la <div class="cart__item__content__settings"> */
  let divArticle6 = document.createElement("div");
  divArticle4.appendChild(divArticle6);
  divArticle6.classList.add("cart__item__content__settings__delete");
  divArticle6.innerHTML = `<p class="deleteItem">Supprimer</p>`;
  }
};