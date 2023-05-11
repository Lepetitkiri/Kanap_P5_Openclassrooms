/* JS page linked to index.html */

/* Récupération des produits depuis l'API : */
const product = fetch('http://localhost:3000/api/products')
    .then(product => product.json())

    /* Création des produits */
for ( i = 0 ; i < 100; i++ ) {
    /* insertion de l'élèment <a> : */ 
    let productA = document.createElement("a");
    document.querySelector(".items").appendChild(productA);
    productA.href = `./product.html?id=${i}`

    /* insertion de l'élèment <article> dans le <a> : */
    let productArticle = document.createElement('article');
    productA.appendChild(productArticle);
    productArticle.innerText = ``
}