/**
 * Récupère l'URL de l'API back-end en fonction de l'environnement.
 * Si la variable d'environnement BACKEND_URL est définie, elle sera utilisée.
 * Sinon, l'URL par défaut http://localhost:3000 sera utilisée pour les tests en local.
 * @param {string} endpoint - La fin de l'URL de l'API (ex: 'api/products')
 * @returns {string} L'URL complète de l'API back-end
 */
// utils.js
export const getBackendUrl = (endpoint) => {
    try {
        return `${process.env.BACKEND_URL}/${endpoint}`;
    } catch (error) {
        return `http://localhost:3000/${endpoint}`;
    }
};