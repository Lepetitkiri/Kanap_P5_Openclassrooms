/* JS page linked to index.html */

/* Récupération des produits depuis l'API : */
const product = fetch('http://localhost:3000/api/products')
    .then(product => product.json())
    .then(function(product) {productCreation(product)});

    /* Création des produits */
function productCreation(product) {
    for ( i = 0 ; i < product.length; i++ ) {

    /* insertion de l'élèment <a> : */ 
    let productA = document.createElement("a");
    document.querySelector(".items").appendChild(productA);
    productA.href = `./product.html?id=${i}`

    /* insertion de l'élèment <article> dans le <a> : */
    let productArticle = document.createElement('article');
    productA.appendChild(productArticle);
    productArticle.innerText = ``;

    /* insertion de l'élèment <img> dans l'<article> : */
    let productImage = document.createElement("img");
    productArticle.appendChild(productImage);
    productImage.src = product[i].imageUrl;
    
    /* insertion de l'élèment <h3> dans <a> : */
    let productName = document.createElement("h3");
    productArticle.appendChild(productName);
    productName.innerText = product[i].name;
    
    /* insertion de l'élèment <p> dans l'<a> : */
    let productDescription = document.createElement("p");
    productArticle.appendChild(productDescription);
    productDescription.innerText = product[i].description;
    }
}




