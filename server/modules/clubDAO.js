const { ModuleFilenameHelpers } = require("webpack");
const dbo = require("../db/conn");
/**
 * @module modules/clubDAO
 */

/**
 * Find a club in the database
 * @param {String} email
 * @returns {Promise<Object>} Object returned from .findOne() call - the club object itself
 */
 module.exports.findClub = function (email) {
    let db_connect = dbo.getDb();

    let clubObj = {
        email: email
    }

    return new Promise( (res, rej) => {
        db_connect.collection("clubs").findOne(clubObj, (err, result) => {
            if (err) {
                rej(err)
            } else {
                res(result)
            }
        });
    })
}

/**
 * Checks if a club with a given name exists in the database
 * @param {String} name 
 * @returns {Promise<Boolean>} True if found, False otherwise
 */
 module.exports.isClubNameTaken = function (name) {
    let db_connect = dbo.getDb();

    let clubObj = {
        clubName: name
    }

    return new Promise( (res, rej) => {
        db_connect.collection("clubs").findOne(clubObj, (err, result) => {
            if (err) {
                rej(err)
            } else {
                res(result !== null);
            }
        });
    })
}