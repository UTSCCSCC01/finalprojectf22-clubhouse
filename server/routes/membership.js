const { response } = require("express");
const express = require("express");
const { JavascriptModulesPlugin } = require("webpack");
const routes = express.Router();
const DAO = require("../modules/membershipDAO");
const userDAO = require("../modules/userDAO");

//require("dotenv").config({ path: "./config.env" });

/**
 * @module routes/membership
 */

/**
 * Create a membership application. Expects a payload of at least email and clubEmail, with optional name and clubName with workarounds.
 * Responds with {success: true} if op is successful, else {text, disabled} where text is the new button text, and disabled is whether the button should be disabled
 * If there is already an application, it does not create a new one, and makes the corresponding response
 * @name applyMember
 */
routes.route("/applyMember").post(
    
    async (req, res) => {

    if (!req.body.email || !req.body.clubEmail) {
        res.status(500);
        res.json({text: "Bad Request", disabled: false});
        return;
    }
    
    if (!req.body.name) {
        let userObj = await userDAO.findUser(req.body.email,"student");
        req.body.name = userObj.name
    }

    if (!req.body.clubName) {
        let clubObj = await userDAO.findUser(req.body.clubEmail, "club");
        req.body.clubName = clubObj.name;
    }

    if (await DAO.findPotentialMember(req.body.email, req.body.clubEmail)) { //already applied!
        res.json({text: "Already Applied", disabled: true});
        return;
    }

    await DAO.addPotentialMember(req.body.email, req.body.clubEmail, req.body.name, req.body.clubName);

    res.json({success: true});
    
}); 

module.exports = routes;