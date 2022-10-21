const dbo = require("../db/conn");

/**
 * @module memberDAO
 */


/**
 * Create a membership application 
 * @param {String} email User email
 * @param {String} clubEmail Club email
 * @param {String} name User's real name (e.g. John Doe)
 * @param {String} clubName Club's name
 * @returns {Promise<Object>} Result object
 */
module.exports.addPotentialMember = function(email, clubEmail, name, clubName) {
    let db_connect = dbo.getDb();

    insertObj = {
        email,
        clubEmail,
        userName: name,
        clubName
    };

    return new Promise((resolve, reject) => {
        db_connect.collection("clubApplicants").insertOne(insertObj, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * Find a membership application with the specified email and clul email
 * @param {String} email 
 * @param {String} clubEmail 
 * @returns {Promise<Object>} Found document if found, else undefined
 */
module.exports.findPotentialMember = function(email, clubEmail) {
    let db_connect = dbo.getDb();

    insertObj = {
        email,
        clubEmail
    };

    return new Promise((resolve, reject) => {
        db_connect.collection("clubApplicants").findOne(insertObj, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}