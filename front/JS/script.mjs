import { getBackendUrl } from '../utils.mjs';

/**
 * Récupère les produits depuis l'API back-end et les affiche.
 * Utilise la fonction getBackendUrl pour construire l'URL de l'API en fonction de l'environnement.
 */
const getAPI = () => {
    fetch(getBackendUrl('api/products'))
        .then(response => response.json())
        .then(products => displayProducts(products))
        .catch(error => console.error('Erreur lors de la requête :', error));
};

/**
 * Affichage des produits dans le DOM
 * @param {Object} product 
 */
const displayProducts = (product) => {
    product.forEach(function (product) {

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


document.addEventListener('DOMContentLoaded', function (event) {
    getAPI();
});