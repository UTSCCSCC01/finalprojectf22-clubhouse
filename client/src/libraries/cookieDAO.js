/**
 * @module libraries/cookieDAO
 */

const Cookie = require('js-cookie')

/**
 * Returns stored cookie with given key
 * @param {String} key 
 * @returns {String} Cookie
 */
module.exports.getCookie = key => Cookie.get(key);
/**
 * Sets a key-value pair as a cookie
 * @param {String} key 
 * @param {String} value 
 */
module.exports.setCookie = (key, value) => Cookie.set(key, value);

