const { ModuleFilenameHelpers } = require("webpack");
const dbo = require("../db/conn");
/**
 * @module modules/clubDAO
 */

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
