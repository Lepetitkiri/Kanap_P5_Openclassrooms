/**
 * Récupération de l'id du canapé depuis l'URL de la page
 * @returns {String} urlId
 */
const idRecuperation = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlId = urlParams.get('id');
    return urlId
};

/**
 * Récupération des produits depuis l'API
 * @return {Object} product
 */
const getAPI = () => {
    fetch(process.env.BACKEND_URL + `/api/products/${urlId}`)
        .then(response => response.json())
        .then(product => displayProductPage(product))
};

/**
 * Affichage des produits dans le DOM
 * @param {Object} product
 */
const displayProductPage = (product) => {
    /* insertion du src et alt de l'image */
    let productImage = document.createElement('img');
    document.querySelector(`.item__img`).appendChild(productImage);
    productImage.src = product.imageUrl;
    productImage.alt = product.altTxt;

    /* insertion du nom du produit */
    let productName = document.getElementById(`title`);
    productName.textContent = product.name;

    /* insertion du prix du produit */
    let productPrice = document.getElementById(`price`);
    productPrice.textContent = product.price

    /* insertion de la description du produit */
    let productDescription = document.getElementById(`description`);
    productDescription.textContent = product.description;

    /* insertion des options de couleurs du produit */
    for (let i = 0; i < product.colors.length; i++) {
        let productColor = document.createElement(`option`);
        document.querySelector(`#colors`).appendChild(productColor);
        productColor.textContent = product.colors[i];
    };
};

/**
 * Gestionnaire d'evenement 
 */
const addEventListener = () => {
    /* Création des variables */
    let color = "";
    let quantity = "";

    /* Récupération des datas au click sur les balises */
    document.getElementById(`colors`).addEventListener('change', (e) => {
        color = e.target.value;
    })
    document.getElementById(`quantity`).addEventListener('change', (e) => {
        quantity = e.target.value;
    });
    /* Ecouteur d'événement pour le bouton "Ajouter au panier" */
    document.getElementById(`addToCart`).addEventListener('click', (e) => {
        checkUserOptions(color, quantity);
    });
};

/**
 * Ajout de la commande dans le local storage
 * @param {String} urlId
 * @param {String} color
 * @param {String} quantity
 */
addItemToCart = (urlId, color, quantity) => {
    let key = `${urlId} ${color}`; /* Clé d'identification du produit  sélectionné */
    let cart = JSON.parse(localStorage.getItem(key)) || []; /* Récupération du panier depuis le local storage, si null, renvoi un array vide */

    /* On compare si il existe déjà cet element au panier : */
    let localStorageExistingKeys = Object.keys(localStorage); /* Pour cela on récupère les elements du local storage sous forme d'array comprenant id / couleur*/
    let existingItem = localStorageExistingKeys.includes(urlId + " " + color); /* Renvoi un booléen indiquant si le produit est déjà dans le panier ou non */

    if (existingItem) {
        /* si le produit existe dans le panier : */
        existingItemQuantity = parseInt(cart) + parseInt(quantity); /* Modification de la quantité */
        localStorage.setItem(key, JSON.stringify(existingItemQuantity)); /* Enregistrement dans le local storage */
    } else {
        /* si le produit n'existe pas encore dans le panier : */
        cart.push(parseInt(quantity)); /* Ajout de la valeur du produit dans l'array vide */
        localStorage.setItem(key, JSON.stringify(parseInt(cart))) /* Ajout au local storage */
    }
};

/**
 * Vérification que les options produits ont bien été saisies pas l'utilisateur avant passage de la commande
 * @param {string} color 
 * @param {string} quantity 
 */
const checkUserOptions = (color, quantity) => {
    if (color === "") {
        window.alert(`veuillez selectionner une couleur SVP`);
    } else {
        if (quantity < 1 || quantity > 100) {
            window.alert(`Veuillez selectionner une quantité entre 1 et 100 SVP`);
        } else {
            addItemToCart(urlId, color, quantity);
            window.location.replace(`./cart.html`) /* Redirection vers la page panier */
        };
    };
};


const urlId = idRecuperation();
getAPI();
addEventListener();
