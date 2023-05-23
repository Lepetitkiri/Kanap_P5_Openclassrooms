/* JS page linked to product.html */

/* Récupération du href de la page */
const url = window.location.href;
/* Extraction de l'ID depuis le href de la page */
const urlIdsSplited = url.split('=');
const urlId = urlIdsSplited[1];



/* Récupération des produits depuis l'API : */
const product = fetch(`http://localhost:3000/api/products/${urlId}`)
    .then(product => product.json())
    .then(function(product) {displayProductPage(product)});


        /* Insertion des datas du produit sélectionné dans la page */
function displayProductPage(product) {

    /* insertion du src et alt de l'image */
    let productImage = document.createElement('img');
    document.querySelector(`.item__img`).appendChild(productImage);
    productImage.src = product.imageUrl;
    productImage.alt = product.altTxt;

    /* insertion du nom du produit */
    let productName = document.getElementById(`title`);
    productName.innerHTML = product.name;

    /* insertion du prix du produit */
    let productPrice = document.getElementById(`price`);
    productPrice.innerHTML = product.price

    /* insertion de la description du produit */
    let productDescription = document.getElementById(`description`);
    productDescription.innerHTML = product.description;

    /* insertion des options de couleurs du produit */
    for (let i = 0; i < product.colors.length; i++) {
        let productColor = document.createElement(`option`);
        document.querySelector(`#colors`).appendChild(productColor);
        productColor.innerHTML = product.colors[i];
    }
    
}




/* Recupérer les infos des produits sélectionnés : */

/* Selection des balises */
const addToCartButton = document.getElementById(`addToCart`); 
const selectedProductColorbutton = document.getElementById(`colors`);  
const selectedProductQuantitybutton = document.getElementById(`quantity`); 

/* Création des variables */
let color = ""; 
let quantity = "";

/* Récupération des datas au click sur les balises */
selectedProductColorbutton.addEventListener('click', (e) => { 
    color = e.target.value;
})

selectedProductQuantitybutton.addEventListener('click', (e) => { 
    quantity = e.target.value;
})

/* Au click sur "ajouter au panier", on récupère les datas stockées dans color et quantity et on les stocke dans le local storage */
addToCartButton.addEventListener('click', (e) => {
    if (color === "") {
        window.alert(`veuillez selectionner une couleur SVP`);
    } else {
        if (quantity <= 0 || quantity > 100) {
            window.alert(`Veuillez selectionner une quantité entre 1 et 100 SVP`);
    } else {
        localStorage["id"] = urlId;
        localStorage["quantity"] = quantity;
        localStorage["color"] = color;
        window.location.replace(`./cart.html`) /* Redirection vers la page panier */
    } } });