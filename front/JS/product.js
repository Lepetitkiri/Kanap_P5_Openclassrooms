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