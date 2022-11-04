const dbo = require("../db/conn");

/**
 * @module modules/memberDAO
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

module.exports.getMembersByClub = function(clubEmail) {
    let db_connect = dbo.getDb();

    let searchObj = {
        clubEmail
    }

    return new Promise((res, rej) => {
        db_connect
        .collection("club-members")
        .find(searchObj).toArray(function (err, result) {
            if (err) rej(err);
            res(result);
        });
    });
}

module.exports.getClubsByMember = function(email) {
    let db_connect = dbo.getDb();

    let searchObj = {
        email
    }

    return new Promise((res, rej) => {
        db_connect
        .collection("club-members")
        .find(searchObj).toArray(function (err, result) {
            if (err) rej(err);
            res(result);
        });
    });
}