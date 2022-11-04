const dbo = require("../db/conn");

/**
 * @module modules/notificationDAO
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