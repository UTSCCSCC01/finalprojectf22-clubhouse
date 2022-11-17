import { getCookie } from '../libraries/cookieDAO'
/**
 * Redirects users if they are not allowed to access a page
 * @param {} notallowed - the accounttype and page to redirect to if the user is not allowed to access the page
 */
const Auth = function(notallowed) {
    var accountType = getCookie("accountType");
    if (accountType === null) {
        console.log("user: "+ accountType);

        if (Object.keys(notallowed).includes("null")) {
            window.location = notallowed["null"];
        }
    }
    if (Object.keys(notallowed).includes(accountType)) {
        window.location = notallowed[accountType];
    }
}
export default Auth;