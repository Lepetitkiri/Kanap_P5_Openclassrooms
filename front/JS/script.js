/* JS page linked to index.html */

/* Récupération des produits depuis l'API : */
const product = fetch("http://localhost:3000/api/products")
    .then(product => product.json())

