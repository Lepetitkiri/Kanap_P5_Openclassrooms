/* JS page linked to product.html */

/* Récupération du href de la page */
const url = window.location.href;
/* Extraction de l'ID depuis le href de la page */
const urlIdsSplited = url.split('=');
const urlId = urlIdsSplited[1];