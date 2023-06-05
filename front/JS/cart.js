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









  


/* Récupération des produits depuis l'API : */
fetch(`http://localhost:3000/api/products`)
    .then(response => response.json())
    /*.then(products => getCart(products)) */
    /* .then(products => displayProductsByApi(products));




/* Insertion des datas du produit sélectionné dans la page */

/* Datas récupérées depuis le local storage */
function displayProductsByCart(cart) {
  for ( i = 0 ; i < cart.length; i++ ) {

  /* Création d'un <article> contenant les infos produit */
  let productArticle = document.createElement("article");
  document.getElementById(`cart__items`).appendChild(productArticle);
  productArticle.classList.add(`cart__item`);
  productArticle.setAttribute("class", "cart__item");
  productArticle.setAttribute("class", `data-id=product-${cart[i].color}`);
  productArticle.setAttribute("class", `data-color=product-${color}`);
/* AJOUTER LES ATTRIBUTS : class="cart__item" data-id="{product-ID}" data-color="{product-color}" */

  /* Création d'une <div class="cart__item__img"> dans l'<article> */
  let divArticle = document.createElement("div");
  productArticle.appendChild(divArticle);
  divArticle.classList.add("cart__item__img");

  /* Creation d'une <div class="cart__item__content"> dans l'<article> */
  let divArticle2 = document.createElement("div");
  productArticle.appendChild(divArticle2);
  divArticle2.classList.add("cart__item__content");

  /* Creation d'une <div class="cart__item__content__description"> dans la <div class="cart__item__content"> */
 /* let divArticle3 = document.createElement("div");
  divArticle3.classList.add("cart__item__content__description");
  divArticle2.appendChild(divArticle3);
  divArticle3.innerHTML = `<h2>${product[i].name}</h2> <p> ${product[i].colors}</p> <p>${product[i].price}</p>`;

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
  divArticle5.innerHTML = `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="">`;

  /* Creation d'une <div class="cart__item__content__settings"__delete> dans la <div class="cart__item__content__settings"> */
  let divArticle6 = document.createElement("div");
  divArticle4.appendChild(divArticle6);
  divArticle6.classList.add("cart__item__content__settings__delete");
  divArticle6.innerHTML = `<p class="deleteItem">Supprimer</p>`;
  }
};

/* Datas récupérées depuis l'API */
/*function displayProductsByApi(product) {
  for ( i = 0 ; i < product.length; i++ ) {

  /* Création d'une <img> contenant les infos produit */

        /* let imgArticle = document.createElement("img");
  let divArticle = document.querySelector(".cart__item__img");
  divArticle.appendChild(imgArticle);
  imgArticle.src = product[i].imageUrl;
  imgArticle.alt = product[i].altTxt;

  /* Creation d'une <div class="cart__item__content"> dans l'<article> */
 /* let divArticle2 = document.createElement("div");
  productArticle.appendChild(divArticle2);
  divArticle2.classList.add("cart__item__content");

  /* Creation d'une <div class="cart__item__content__description"> dans la <div class="cart__item__content"> */
        /* let divArticle3 = document.createElement("div");
  divArticle3.classList.add("cart__item__content__description");
  let divArticle2 = document.querySelector(".cart__item__content__settings");
  divArticle2.appendChild(divArticle3);
  divArticle3.innerHTML = `<h2>${product[i].name}</h2> <p> ${product[i].colors}</p> <p>${product[i].price}</p>`;

  /* Creation d'une <div class="cart__item__content__settings"> dans la <div class="cart__item__description"> */
 /* let divArticle4 = document.createElement("div");
  divArticle2.appendChild(divArticle4);
  divArticle4.classList.add("cart__item__content__settings");

  /* Creation d'une <div class="cart__item__content__settings"__quantity> dans la <div class="cart__item__content__settings"> */
 /* let divArticle5 = document.createElement("div");
  divArticle4.appendChild(divArticle5);
  divArticle5.classList.add("cart__item__content__settings__quantity"); */

  /* let pArticle = document.createElement("p");
  divArticle5.appendChild(pArticle);
  pArticle.innerText = `Qté : `;
  divArticle5.innerHTML = `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="">`;

  /* Creation d'une <div class="cart__item__content__settings"__delete> dans la <div class="cart__item__content__settings"> */
  /* let divArticle6 = document.createElement("div");
  divArticle4.appendChild(divArticle6);
  divArticle6.classList.add("cart__item__content__settings__delete");
  divArticle6.innerHTML = `<p class="deleteItem">Supprimer</p>`; */
        /* }
}; */





