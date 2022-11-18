const { json } = require("body-parser");
const express = require("express");
const routes = express.Router();
const settingsDAO = require("../modules/membershipDAO");

/**
 * @module routes/settings
 */

/**
 * Update email notification settings
 * @name /updateSettings
 */
routes.route("/updateSettings").post( async (req, res) => {
    if (!req.body.email || !req.body.clubEmail || req.body.newSetting === undefined) {
        res.status(400);
        res.send("");
        return;
    }

    await settingsDAO.updateSettings(req.body.email, req.body.clubEmail, req.body.newSetting);
    res.status(200);
    res.send("");
})

module.exports = routes;