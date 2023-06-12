/* JS page linked to cart.html */

let cart = [] /* Panier */
let productsDatasFromApi = []; /* Stockage des données depuis API */

getDatas();


/* Récupération des elements du panier :*/
function getDatas() {
  
  for ( i = 0; i < localStorage.length; i++ ) {

  /* Récupération des élements du local storage : */
  const key = localStorage.key(i); /* Récupération de l'ensemble des clés contenues dans le local storage */
  const keySplited = key.split(' '); /* Séparation de la clé en deux string */
  const idInTheLocalStorage = keySplited[0]; /* Récupération des id du local storage */
  const colorInTheLocalStorage =  keySplited[1]; /* Récupération des color du local storage */
  const quantityInTheLocalStorage = JSON.parse(localStorage.getItem(key)); /* Récupération des quantity du local storage */

  /* Récupération des infos depuis l'API : */
  product = fetch(`http://localhost:3000/api/products/${idInTheLocalStorage}`)
  .then(response => response.json())
  /* Création d'un element pour chaque produit du cart */
  .then(response =>  {
    const objectInTheLocalStorage = {
      color: colorInTheLocalStorage,
      _id: idInTheLocalStorage,
      name: response.name,
      price: response.price,
      imageUrl: response.imageUrl,
      description: response.description,
      altTxt: response.altTxt,
      quantity: quantityInTheLocalStorage
      };
      cart.push(objectInTheLocalStorage); /* Stockage des datas */
    });
  };
}



/* Insertion des datas du produit sélectionné dans la page */
function displayProducts(cart) {
  for ( i = 0 ; i < cart.length; i++ ) {
 
   /* Création d'un <article> contenant les infos produit */
   let productArticle = document.createElement("article");
   document.getElementById(`cart__items`).appendChild(productArticle);
   productArticle.classList.add(`cart__item`);
   productArticle.classList.add(`data-id=product-${cart[i]._id}`);
   productArticle.classList.add(`data-color=product-${cart[i].color}`);
 
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
   divArticle3.innerHTML = `<h2>${cart[i].name}</h2> <p> ${cart[i].color}</p> <p>${cart[i].price},00€</p>`;
 
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
