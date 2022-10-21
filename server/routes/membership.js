const { response } = require("express");
const express = require("express");
const { JavascriptModulesPlugin } = require("webpack");
const routes = express.Router();
const DAO = require("../modules/membershipDAO");
const userDAO = require("../modules/userDAO");

//require("dotenv").config({ path: "./config.env" });


routes.route("/applyMember").post(
    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    async (req, res) => {

    if (!req.body.email || !req.body.clubEmail) {
        res.status(500);
        res.json({text: "Bad Request", disabled: false});
        return;
    }
    
    if (!req.body.name) {
        let userObj = await userDAO.findUser({email: req.body.email, accountType: "student"});
        req.body.name = userObj.name
    }

    if (!req.body.clubName) {
        let clubObj = await userDAO.findUser({email: req.body.email, accountType: "club"});
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