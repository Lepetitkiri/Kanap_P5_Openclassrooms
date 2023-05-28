/* JS page linked to cart.html */

/* Récupération des produits depuis l'API : */
const product = fetch(`http://localhost:3000/api/products`)
    .then(product => product.json())
    .then(getCart(`cart`))
    .then(displayProducts(`cart`));

  /* Récupération du panier */
  function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null ) /* le panier est vide */{
        return [];
    } else /* la panier contient deja des objets */ {
        return JSON.parse(cart);
        cart.push(cart);
    }
};




/* Insertion des datas du produit sélectionné dans la page */

function displayProducts(product) {
    for ( i = 0 ; i < product.length; i++ ) {

    /* Création d'un <article> contenant les infos produit */
    let productArticle = document.createElement("article");
    document.getElementById(`cart__items`).appendChild(productArticle);
    productArticle.classList.add(`cart__item`);
/* AJOUTER LES ATTRIBUTS : class="cart__item" data-id="{product-ID}" data-color="{product-color}" */

    /* Création d'une <div class="cart__item__img"> dans l'<article> */
    let divArticle = document.createElement("div");
    productArticle.appendChild(divArticle);
    divArticle.classList.add("cart__item__img");

    let imgArticle = document.createElement("img");
    divArticle.appendChild(imgArticle);
    imgArticle.src = product[i].imageUrl;
    imgArticle.alt = product[i].altTxt;

    /* Creation d'une <div class="cart__item__content"> dans l'<article> */
    let divArticle2 = document.createElement("div");
    productArticle.appendChild(divArticle2);
    divArticle2.classList.add("cart__item__content");

    /* Creation d'une <div class="cart__item__content__description"> dans la <div class="cart__item__content"> */
    let divArticle3 = document.createElement("div");
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