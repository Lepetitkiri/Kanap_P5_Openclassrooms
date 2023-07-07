/**
 * Récupération de l'id du canapé depuis l'URL de la page
 * @return {String} urlId
 */
const idRecuperation = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlId = urlParams.get('orderId');
    return urlId;
};

/**
 * Affichage des produits dans le DOM
 * @param {String} urlId
 */
const displayOrder = (urlId) => {
    let spanOrderId = document.querySelector('span');
    spanOrderId.innerText = urlId;
}


document.addEventListener('DOMContentLoaded', function(event) {
   const urlId = idRecuperation();
    displayOrder(urlId);
  });
