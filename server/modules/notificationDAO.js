const dbo = require("../db/conn");

/**
 * @module modules/notificationDAO
 */

/**
 * Get notifications for a given array for club emails
 * @param {Number} aftertimestamp Timestamp (in secs since epoch) for which only announcements timestamped after are considered
 * @param {Array<String>} clubEmailList Array of club emails
 * @returns {Promise<Array<Object>>} Array of matching announcements 
 */
module.exports.getNotifications = function (aftertimestamp, clubEmailList) {
    let db_connect = dbo.getDb();

    searchObj = {
        clubEmail: {
            $in: clubEmailList
        },
        time: {
            $gte: aftertimestamp
        }
    }

    return new Promise((res, rej) => {
        db_connect
        .collection("announcements")
        .find(searchObj).toArray(function (err, result) {
            if (err) rej(err);
            res(result);
        });
    });
}