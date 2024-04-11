let cart = [] /* Panier */
let idOfModifyArticle; /* Id d'un article à modifier */
let colorOfModifyArticle; /* Couleur d'un article à modifier */
let quantiOfToModifyArticle; /* Quantité d'un article à modifier */
let newQuantityOfModifyArticle; /* Nouvelle quantité d'un article à modifier */

getDatas().then(() => {
  displayProducts(cart);
  quantityModification(cart);
  cartCalculation(cart);
});

/**
 * Récupération des éléments du panier
 * @return {Promise}
 */
async function getDatas(i) {
  const promises = [];

  for (i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); /* Récupération de l'ensemble des clés contenues dans le local storage */

    /* Récupération des infos depuis l'API : */
    const promise = fetch(`http://localhost:3000/api/products/${key.split(' ')[0]}`)
      .then(response => response.json())
      /* Création d'un element pour chaque produit du cart */
      .then(response => {
        const objectInTheLocalStorage = {
          color: key.split(' ')[1], /* Récupération des color du local storage */
          _id: key.split(' ')[0], /* Récupération des id du local storage */
          name: response.name,
          price: response.price,
          imageUrl: response.imageUrl,
          description: response.description,
          altTxt: response.altTxt,
          quantity: JSON.parse(localStorage.getItem(key)) /* Récupération des quantity du local storage */
        };
        cart.push(objectInTheLocalStorage); /* Stockage des datas */
      });

    promises.push(promise);
  }
  await Promise.all(promises);
}

/**
 * Affichage des produits dans le DOM
 * @param {Array.<{color: String, _id: String, name: String, price: Number, imageUrl: String, altTxt: String, quantity: Number}>} cart 
 */
const displayProducts = (cart) => {
  cart.forEach(function (cart) {
    /* Création d'un <article> contenant les infos produit */
    let productArticle = document.createElement("article");
    document.getElementById(`cart__items`).appendChild(productArticle);
    productArticle.classList.add(`cart__item`);
    productArticle.classList.add(`data-id=product-${cart._id}`);
    productArticle.classList.add(`data-color=product-${cart.color}`);

    /* Création d'une <div class="cart__item__img"> dans l'<article> */
    let divArticle = document.createElement("div");
    productArticle.appendChild(divArticle);
    divArticle.classList.add("cart__item__img");

    /* Création d'une <img> contenant les infos produit */
    let imgArticle = document.createElement("img");
    divArticle.appendChild(imgArticle);
    imgArticle.src = cart.imageUrl;
    imgArticle.alt = cart.altTxt;

    /* Creation d'une <div class="cart__item__content"> dans l'<article> */
    let divArticle2 = document.createElement("div");
    productArticle.appendChild(divArticle2);
    divArticle2.classList.add("cart__item__content");

    /* Creation d'une <div class="cart__item__content__description"> dans la <div class="cart__item__content"> */
    let divArticle3 = document.createElement("div");
    divArticle3.classList.add("cart__item__content__description");
    divArticle2.appendChild(divArticle3);
    divArticle3.innerHTML = `
      <h2>${cart.name}</h2> 
      <p> ${cart.color}</p> 
      <p>${cart.price},00€</p>
      `;

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
    divArticle5.innerHTML = `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart.quantity}">`;

    /* Creation d'une <div class="cart__item__content__settings"__delete> dans la <div class="cart__item__content__settings"> */
    let divArticle6 = document.createElement("div");
    divArticle4.appendChild(divArticle6);
    divArticle6.classList.add("cart__item__content__settings__delete");
    divArticle6.innerHTML = `<p class="deleteItem" id=${cart._id}*${cart.color}>Supprimer</p>`;

    /* Création d'un evenement permettant de surveiller les boutons supprimer et de lancer la fonction de suppression */
    let deleteButton = document.getElementById(`${cart._id}*${cart.color}`)
    deleteButton.addEventListener('click', () => {
      deleteArticle(deleteButton.id);
    });
  });
};

/**
 * Supression d'un article du panier
 * @param {String} itemToDeleteDatas 
 */
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
  cartCalculation(cart);
};

/**
 * Récupération de id/color associés au produit à supprimer
 * @param {HTMLInputElement} divArticle2 
 */
function getDatasFromModifyArticle(divArticle2) {

  /* Récupération de id/color associés au produit supprimé */
  classNameOfModifyArticle = divArticle2.className; /* Récupération de la class */
  idOfModifyArticle = classNameOfModifyArticle.split('-')[2].split(' ')[0];
  colorOfModifyArticle = classNameOfModifyArticle.split(' ')[2].split('=')[1].split('-')[1];

  /* Récupération de quantité/Prix associés au produit supprimé */
  quantiOfToModifyArticle = localStorage.getItem(`${idOfModifyArticle} ${colorOfModifyArticle}`);
};

/**
 * Calcul et affichage du total panier
 * @param {Array.<{color: String, _id: String, name: String, price: Number, imageUrl: String, altTxt: String, quantity: Number}>} cart 
 */
const cartCalculation = (cart) => {
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
  /* Affichage du total panier dans le DOM */
  document.getElementById("totalQuantity").textContent = articleTotal;
  document.getElementById("totalPrice").textContent = articleTotalPrice;
};

/**
 * Modification de la quantité du panier
 * @param {Array.<{color: String, _id: String, name: String, price: Number, imageUrl: String, altTxt: String, quantity: Number}>} cart 
 */
const quantityModification = (cart) => {
  /* Selection des boutons */
  let quantityInputs = document.getElementsByClassName(`itemQuantity`);

  /* Creation de l'evenement associé au bouton */
  Array.from(quantityInputs).forEach((input, i) => {
    /* Récupération de la nouvelle quantité */
    input.addEventListener(`click`, (e) => {
      newQuantityOfModifyArticle = Number(e.target.value);
    });

    input.addEventListener(`click`, function () {
      /* Récupération de id/color/prix associés au produit modifié */
      const domElementAssociatedToArticle = input.closest('article'); /* Selectionne l'ancêtre <article> le + proche */
      getDatasFromModifyArticle(domElementAssociatedToArticle);
      const priceOfModifyArticle = cart.price;

      /* Modification de l'élément dans le LS et cart */
      localStorage.removeItem(`${idOfModifyArticle} ${colorOfModifyArticle}`);
      localStorage.setItem(`${idOfModifyArticle} ${colorOfModifyArticle}`, newQuantityOfModifyArticle);
      for (let j = 0; j < cart.length; j++) {
        if (cart[j].color === colorOfModifyArticle && cart[j]._id === idOfModifyArticle) {
          cart[j].quantity = newQuantityOfModifyArticle;
          break;
        }
      }

      /* Recalcul du total panier */
      cartCalculation(cart);
    });
  });
};

/* Validation de formulaire */
document.getElementById(`order`).addEventListener('click', (e) => {
  /* Création de masques Regex */
  let worldRegex = /^[a-zA-Zà-ÿ-\s]+$/;
  let addressRegex = /[0-9a-zA-Zà-ÿ-\s]+$/;
  let cityRegex = /^[0-9]{5}\s[a-zA-Zà-ÿ-\s]+$/;
  let emailRegex = /^[a-zA-Zà-ÿ-]+[@][a-zA-Zà-ÿ-]+[.][a-zA-Zà-ÿ-]{2,3}$/;

  /**
   * Fonction de vérification de la validité du format de données renseignées dans le formulaire
   * @param {String} valueToCheck 
   * @param {Regex mask} mask 
   * @param {HTMLElement} domElement 
   * @param {String} errorMessage 
   */
  const formCheking = (valueToCheck, mask, domElement, errorMessage) => {
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
  cart.length !== 0
    ? (
      e.preventDefault(),
      formCheking(firstName.value, worldRegex, document.getElementById(`firstNameErrorMsg`), `OUPS! Veuillez vous limiter aux lettres, accents ou espaces SVP. Exemple : Noemie`),
      formCheking(lastName.value, worldRegex, document.getElementById(`lastNameErrorMsg`), `OUPS! Veuillez vous limiter aux lettres, accents ou espaces SVP. Exemple : Diop`),
      formCheking(address.value, addressRegex, document.getElementById(`addressErrorMsg`), `OUPS! Une adresse valide ressemble à ca : 2 rue des ânes`),
      formCheking(city.value, cityRegex, document.getElementById(`cityErrorMsg`), `OUPS! Veuillez indiquer le code postal suivi de la ville. Exemple : 59283 Moncheaux`),
      formCheking(email.value, emailRegex, document.getElementById(`emailErrorMsg`), `OUPS! Une adresse e-mail valide ressemble à ca : Noemie.diop@gmail.com`),
      sendCartToApi())
    : (window.alert("Heu... Vous voulez acheter du vent ou quoi ? Ca serait mieux de mettre un ou plusieurs canapés dans votre panier."), e.preventDefault());

  /**
   * Récupération des datas du formulaire et du cart
   */
  function sendCartToApi() {
    if (worldRegex.test(firstName.value) === true && worldRegex.test(lastName.value) === true && addressRegex.test(address.value) === true && cityRegex.test(city.value) && emailRegex.test(email.value)) {
      let cartRecuperation = cart.map(cart => [cart._id]);
      let order = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products: cartRecuperation,
      };

      /* Envoi des datas vers l'API */
      fetchToApi(order);
    }
  };
});

/**
 * Envoi de la commande vers l'API
 * @param {Object} order 
 * @param {Object} order.contact
 * @param {string} order.contact.firstName - Nom de famille du contact
 * @param {string} order.contact.lastName - Nom de famille du contact
 * @param {string} order.contact.address - Adresse du contact
 * @param {string} order.contact.city - Ville du contact
 * @param {string} order.contact.email - Adresse e-mail du contact
 * @param {string} order.products - Informations sur les produits de la commande (sous forme de chaîne de caractères)
 */
const fetchToApi = (order) => {
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
};