const dayjs = require("dayjs");
const express = require("express");
const notifRoutes = express.Router();
const EmlWrp = require("../modules/emailWrapper");

const memDAO = require("../modules/membershipDAO");
const notDAO = require("../modules/notificationDAO");

/**
 * @module routes/notification
 */

notifRoutes.route("/notif/get").post(async function (req, res) {
    let email = req.body.email;
    let timespan = req.body.timespan;

    let clubs = await memDAO.getClubsByMember(email);

    clubEmailList = clubs.map(v => v.clubEmail); // Go from objects to strings

    //console.log(clubEmailList);

    let notifs = await notDAO.getNotifications(dayjs().unix() - timespan, clubEmailList);

    res.json(notifs);
})

notifRoutes.route("/notif/emailstatus").get(async function (req, res) {
    
})

module.exports = notifRoutes;