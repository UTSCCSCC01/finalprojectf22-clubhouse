const Cookie = require('js-cookie')

module.exports.getCookie = key => Cookie.get(key);
module.exports.setCookie = (key, value) => Cookie.set(key, value);

