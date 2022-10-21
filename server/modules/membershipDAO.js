const dbo = require("../db/conn");

/**
 * @module memberDAO
 */


/**
 * 
 * @param {String} username 
 * @param {String} clubEmail
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