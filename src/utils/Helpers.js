import * as Constants from '../utils/Constants'
/**
 * Checks if the user is authenticated or not
 *
 * @param {string} user Authenticated user id
 */
export function isUserAuthenticated(user) {
    return user !== null && user !== Constants.SIGNED_OUT_USER;
}
/**
 * Checks if the store has some data loading or not
 * 
 * @param {LoadingBar} loading Reference to loading bar in store
 */
export function isStoreLoading(loading) {
    return loading[Constants.LOADING_BAR_VISIBILITY] === Constants.LOADING_BAR_SHOWING;
}
/**
 * Generate random integer with min and max included
 *
 * @param {int} min Minimum limit (included)
 * @param {int} max Maximum limit (included)
 */
export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
