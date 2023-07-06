/**
 * Récupération des produits depuis l'API
 * @return { Object}
 */
const getAPI = () => {
    fetch(`http://localhost:3000/api/products`)
    .then(response => response.json())
    .then(product => displayProducts(product));
}
   
/**
 * Affichage des produits dans le DOM
 * @param { Object } product 
 */
const displayProducts = (product) => {
    product.forEach(function(product) {

    /* insertion de l'élèment <a> : */ 
    let productA = document.createElement(`a`);
    document.querySelector(`.items`).appendChild(productA);
    productA.href = `./product.html?id=${product._id}`

    /* insertion de l'élèment <article> dans le <a> : */
    let productArticle = document.createElement(`article`);
    productA.appendChild(productArticle);
    productArticle.textContent = ``;

    /* insertion de l'élèment <img> dans l'<article> : */
    let productImage = document.createElement(`img`);
    productArticle.appendChild(productImage);
    productImage.src = product.imageUrl;
    productImage.alt = product.altTxt;
    
    /* insertion de l'élèment <h3> dans <a> : */
    let productName = document.createElement(`h3`);
    productArticle.appendChild(productName);
    productName.textContent = product.name;
    
    /* insertion de l'élèment <p> dans l'<a> : */
    let productDescription = document.createElement(`p`);
    productArticle.appendChild(productDescription);
    productDescription.textContent = product.description;
    });
}


document.addEventListener('DOMContentLoaded', function(event) {
    getAPI();
  });