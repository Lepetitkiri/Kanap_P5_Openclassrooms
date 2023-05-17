/* JS page linked to product.html */

/* Récupération du href de la page */
const url = window.location.href;
/* Extraction de l'ID depuis le href de la page */
const urlIdsSplited = url.split('=');
const urlId = urlIdsSplited[1];


/* NON DEMANDé : Redirection vers index.html si la récupération du href n'est pas fait correctement */
if (url.includes(`http`)) {
    console.log(`l'URL de la page actuelle est : ${url}. L'id du produit sélectionné est : ${urlId}`);
} else {
   window.alert(`Vous allez être redirigé vers la page d'accueil. Veuillez nous excuser pour la gène occasionnée.`);
   window.location.replace(`./index.html`)
   const urlErrorDate = Date.now();
   console.log(`Une erreur s'est produite lors de la redirection de l'utilisateur. Date de l'évenement : ${urlErrorDate}`);
}


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