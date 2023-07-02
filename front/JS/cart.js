/* JS page linked to cart.html */

let cart = [] /* Panier */

let idOfModifyArticle; /* Id d'un article à modifier */
let colorOfModifyArticle; /* Couleur d'un article à modifier */
let quantiOfToModifyArticle; /* Quantité d'un article à modifier */
let newQuantityOfModifyArticle; /* Nouvelle quantité d'un article à modifier */


getDatas().then(() => {
  displayProducts(cart);
  quantityModification(cart);
  cartCalcultation(cart);
});



/* Récupération des elements du panier :*/
async function getDatas() {
  const promises = [];

  for (i = 0; i < localStorage.length; i++) {

    /* Récupération des élements du local storage : */
    const key = localStorage.key(i); /* Récupération de l'ensemble des clés contenues dans le local storage */
    const idInTheLocalStorage = key.split(' ')[0]; /* Récupération des id du local storage */
    const colorInTheLocalStorage = key.split(' ')[1]; /* Récupération des color du local storage */
    const quantityInTheLocalStorage = JSON.parse(localStorage.getItem(key)); /* Récupération des quantity du local storage */

    /* Récupération des infos depuis l'API : */
    const promise = fetch(`http://localhost:3000/api/products/${idInTheLocalStorage}`)
      .then(response => response.json())
      /* Création d'un element pour chaque produit du cart */
      .then(response => {
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

    promises.push(promise);
  }
  await Promise.all(promises);
}



/* Insertion des datas du produit sélectionné dans la page */
function displayProducts(cart) {
  for (i = 0; i < cart.length; i++) {

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
    divArticle.appendChild(imgArticle);
    imgArticle.src = cart[i].imageUrl;
    imgArticle.alt = cart[i].altTxt;

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
    divArticle5.innerHTML = `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">`;

    /* Creation d'une <div class="cart__item__content__settings"__delete> dans la <div class="cart__item__content__settings"> */
    let divArticle6 = document.createElement("div");
    divArticle4.appendChild(divArticle6);
    divArticle6.classList.add("cart__item__content__settings__delete");
    divArticle6.innerHTML = `<p class="deleteItem" id=${cart[i]._id}*${cart[i].color}>Supprimer</p>`;
  
    /* Création d'un evenement permettant de surveiller les boutons supprimer et de lancer la fonction de suppression */
    let deleteButton = document.getElementById(`${cart[i]._id}*${cart[i].color}`)
    deleteButton.addEventListener('click', () => {
      deleteArticle(deleteButton.id);
    });
  }
};



/* Supression d'un article du panier : */
function deleteArticle(itemToDeleteDatas) {

  /* Récupération de l'id et de la couleur du produit à supprimer */
  idToDelete = itemToDeleteDatas.split('*')[0];
  colorToDelete = itemToDeleteDatas.split('*')[1];

      /* Suppression de l'elèment du LS et cart */
      localStorage.removeItem(`${idToDelete} ${colorToDelete}`);
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].color == colorToDelete && cart[i]._id == idToDelete) {
          cart.splice(i, 1);
          break;
        };
      };

      /* MAJ du DOM comprenant le recalcul du total panier */
      document.getElementById(`${idToDelete}*${colorToDelete}`).closest('article').remove();
      cartCalcultation(cart);
  };



function getDatasFromModifyArticle(domElementAssociatedToArticle) {

  /* Récupération de id/color associés au produit supprimé */
  classNameOfModifyArticle = domElementAssociatedToArticle.className; /* Récupération de la class */
  idOfModifyArticle = classNameOfModifyArticle.split('-')[2].split(' ')[0];
  colorOfModifyArticle = classNameOfModifyArticle.split(' ')[2].split('=')[1].split('-')[1];

  /* Récupération de quantité/Prix associés au produit supprimé */
  quantiOfToModifyArticle = localStorage.getItem(`${idOfModifyArticle} ${colorOfModifyArticle}`);
};



function cartCalcultation(cart) {

  let articleTotal = 0; /* Nombre d'articles */
  let articleTotalPrice = 0 /* Prix total */

  /* Total du nombre d'articles au panier : */
  for (let i = 0; i < cart.length; i++) {
    articleTotal += cart[i].quantity;
  };
  /* Total du prix des articles au panier : */
  for (let i = 0; i < cart.length; i++) {
    articleTotalPrice += cart[i].price * cart[i].quantity;
  };
  /* Affichage du total panier */
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerText = articleTotal;
  let totalPrice = document.getElementById("totalPrice");
  totalPrice.innerText = articleTotalPrice;
};



/* Modification de la quantité du panier : */
function quantityModification(cart) {

  /* Selection des boutons */
  let quantityInputs = document.getElementsByClassName(`itemQuantity`);

  /* Creation de l'evenement associé au bouton */
  for (let i = 0; i < quantityInputs.length; i++) {
    /* Récupération de la nouvelle quantité */
    quantityInputs[i].addEventListener(`click`, (e) => { newQuantityOfModifyArticle = Number(e.target.value) });

    quantityInputs[i].addEventListener(`click`, function () {
      /* Récupération de id/color/prix associés au produit modifié */
      const domElementAssociatedToArticle = quantityInputs[i].closest('article'); /* Selectionne l'ancètre <article> le + proche */
      getDatasFromModifyArticle(domElementAssociatedToArticle)
      const priceOfModifyArticle = cart[i].price;

      /* Modification de l'elèment dans le LS et cart */
      localStorage.removeItem(`${idOfModifyArticle} ${colorOfModifyArticle}`);
      localStorage.setItem(`${idOfModifyArticle} ${colorOfModifyArticle}`, newQuantityOfModifyArticle);
      for (let j = 0; j < cart.length; j++) {
        if (cart[i].color === colorOfModifyArticle && cart[i]._id === idOfModifyArticle) {
          cart[i].quantity = newQuantityOfModifyArticle;
        };
      };

      /* Recalcul du total panier */
      cartCalcultation(cart)
    });
  };
};



/* Validation de formulaire */

/* Récupération des elements du DOM */
let orderInput = document.getElementById(`order`);
let firstNameErrorMessage = document.getElementById(`firstNameErrorMsg`);
let lastNameErrorMessage = document.getElementById(`lastNameErrorMsg`);
let addressErrorMessage = document.getElementById(`addressErrorMsg`);
let cityErrorMessage = document.getElementById(`cityErrorMsg`);
let emailErrorMessage = document.getElementById(`emailErrorMsg`);

orderInput.addEventListener('click', (e) => {
  /* Récupération des infos renseignées dans le formulaire */
  let firstNameValue = firstName.value;
  let lastNameValue = lastName.value;
  let addressValue = address.value;
  let cityValue = city.value;
  let emailValue = email.value;

  /* Création de masques Regex */
  let worldRegex = /^[a-zA-Zà-ÿ-\s]+$/;
  let addressRegex = /[0-9a-zA-Zà-ÿ-\s]+$/;
  let cityRegex = /^[0-9]{5}\s[a-zA-Zà-ÿ-\s]+$/;
  let emailRegex = /^[a-zA-Zà-ÿ-]+[@][a-zA-Zà-ÿ-]+[.][a-zA-Zà-ÿ-]{2,3}$/;

  /* Fonction de vérification de la validité du format de données renseignées dans le formulaire */
  function formCheking(valueToCheck, mask, domElement, errorMessage) {
    if (valueToCheck === "") {
      domElement.innerText = `Veuillez renseigner ce champ`;
      e.preventDefault();
    } else {
      if (mask.test(valueToCheck) == false) {
        domElement.innerText = `${errorMessage}`;
        e.preventDefault();
      } else {
        if (mask.test(valueToCheck) == true) {
          domElement.innerText = "";
        }
      }
    };
  };

  /* Controle que le cart est bien rempli */
  cart.length !== 0 ?    
  formCheking(firstNameValue, worldRegex, firstNameErrorMessage, `OUPS! Veuillez vous limiter aux lettres, accents ou espaces SVP. Exemple : Noemie`)
  + formCheking(lastNameValue, worldRegex, lastNameErrorMessage, `OUPS! Veuillez vous limiter aux lettres, accents ou espaces SVP. Exemple : Diop`)
  + formCheking(addressValue, addressRegex, addressErrorMessage, `OUPS! Une adresse valide ressemble à ca : 2 rue des ânes`)
  + formCheking(cityValue, cityRegex, cityErrorMessage, `OUPS! Veuillez indiquer le code postal suivi de la ville. Exemple : 59283 Moncheaux`)
  + formCheking(emailValue, emailRegex, emailErrorMessage, `OUPS! Une adresse e-mail valide ressemble à ca : Noemie.diop@gmail.com`) 
  + sendCartToApi() : 
  window.alert("Heu... Vous voulez acheter du vent ou quoi ? Ca serait mieux de mettre un ou plusieurs canapés dans votre panier.") + e.preventDefault();

  /* Récupération des datas du formulaire => format : { {contact}, [{canapé1},{canapé2}...] } */
  function sendCartToApi() {
    if (worldRegex.test(firstNameValue) === true && worldRegex.test(lastNameValue) === true && addressRegex.test(addressValue) === true && cityRegex.test(cityValue) && emailRegex.test(emailValue)) {
      let cartRecuperation = cart.map(cart => [cart._id]);
      let order = {
        contact: {
          firstName: firstNameValue,
          lastName: lastNameValue,
          address: addressValue,
          city: cityValue,
          email: emailValue,
        },
        products: cartRecuperation,
      };
  
      /* Envoi des datas vers l'API */
      fetchToApi(order);
    }
  };
  });

function fetchToApi(order) {
  fetch("http://localhost:3000/api/products/order",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order),
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.clear();
      window.location.href = `confirmation.html?orderId=${data.orderId}`;
    })
    .catch((err) => {
      console.error(err);
    })
}