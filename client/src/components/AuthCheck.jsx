import { getCookie } from '../libraries/cookieDAO'

/**
 * @module libraries/AuthCheck
 */


/**
 * Redirects users if they are not allowed to access a page
 * @param {Object} notallowed - the accounttype and page to redirect to if the user is not allowed to access the page
 */
const Auth = function(notallowed) {
    var accountType = getCookie("accountType");
    if (!accountType) {
        if (Object.keys(notallowed).includes("nonauth")) {
            window.location = notallowed["nonauth"];
        }
    }
    if (Object.keys(notallowed).includes(accountType)) {
        window.location = notallowed[accountType];
    }
}
export default Auth;