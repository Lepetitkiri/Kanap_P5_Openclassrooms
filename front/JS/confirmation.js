/* JS page linked to confirmation.html */

/* Récupération du href de la page */
const url = window.location.href;
/* Extraction de l'ID depuis le href de la page */
const urlIdsSplited = url.split('=');
const urlId = urlIdsSplited[1];

/* Affichage sur la page */
let spanOrderId = document.querySelector('span');
spanOrderId.innerText = urlId;