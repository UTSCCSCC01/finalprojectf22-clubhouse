const { ModuleFilenameHelpers } = require("webpack");
const dbo = require("../db/conn");
/**
 * @module userDAO
 */

/**
 * Return if potential user with given code and email is found in the database
 * @param {String} email Email to query for
 * @param {String} code Code to query for
 * @returns {Promise<Boolean>} True if found, false if not
 */
module.exports.verifyPotentialUser = function (email, code) {
    let db_connect = dbo.getDb();

    const searchObj = {
        email: email,
        code: Number(code)
    }
    return new Promise( (res, rej) => {
        db_connect.collection("potentialUsers").findOne(searchObj, (err, result) => {
            if (err) {
                rej(err)
            } else {
                res(result != null)
            }
        });
    });
}

/**
 * Add potential User to the database
 * @param {String} email Email for new user
 * @param {String} code Verification code for new user
 * @returns {Promise<Object>} Object returned from the .insertOne() call
 */
 module.exports.addPotentialUser = async function (email, code) {
    let db_connect = dbo.getDb();
    
    let dbobj = {
        email: email,
        code: Number(code)    
    };

    return new Promise( (res, rej) => {
        db_connect.collection("potentialUsers").insertOne(dbobj, (err, result) => {
            if (err) throw rej(err);
            res(result);
        });
    })
}

/**
 * Removes potential user from database
 * @param {String} email Email to query for 
 * @param {String} code Verification cod eto query for
 * @returns {Promise<Object>} Object returned from .removeOne() call
 */
 module.exports.removePotentialUser = function (email, code) {
    let db_connect = dbo.getDb();
    
    let dbobj = {
        email: email,
        code: Number(code)    
    };

    return new Promise( (res, rej) => {
        db_connect.collection("potentialUsers").removeOne(dbobj, (err, result) => {
            if (err) throw rej(err);
            res(result);
        });
    })
}

/**
 * Find a regular user in the database
 * @param {String} email 
 * @returns {Promise<Object>} Object returned from .findOne() call - the user object itself
 */
 module.exports.findUser = function (email) {
    let db_connect = dbo.getDb();

    let userObj = {
        email: email
    }

    return new Promise( (res, rej) => {
        db_connect.collection("users").findOne(userObj, (err, result) => {
            if (err) {
                rej(err)
            } else {
                res(result)
            }
        });
    })
}

/**
 * Add a user to the database only if they already do not exist. Existence is checked by comparing emails.
 * @param {String} email Email for new user
 * @param {String} password Password for new user
 * @returns {Promise<Object>} Object returned from .inserteOne() call
 */
 module.exports.addUser = async function (email, password) {
    let db_connect = dbo.getDb();

    let userObj = {
        email: email,
        password: password,
        accountType: "student"
    }

    if (await module.exports.findUser(email) != null) { // User already found
        return async () => {}; // Empty promise ;-;
    }

    return new Promise( (res, rej) => {
        db_connect.collection("users").insertOne(userObj, (err, result) => {
            if (err) {
                rej(err)
            } else {
                res(result)
            }
        });
    })
}