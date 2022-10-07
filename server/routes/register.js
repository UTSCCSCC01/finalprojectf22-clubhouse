const express = require("express");
const recordRoutes = express.Router();
require("dotenv").config({ path: "./config.env" });
const DAO = require("../userDAO");
const EmlWrp = require("../emailWrapper");


recordRoutes.route("/register").post(async function (req, response) {
    let code = Math.floor(Math.random() * 9000) + 1000; // At most 4 digit code

    // Verify uoft email
    if (!req.body.email.endsWith("@mail.utoronto.ca")) {
        return; // No need to give info, the api is being willingly misused if we get here
    }

    let emailCfg = {
        from: "utscclubhouse@gmail.com",
        to: req.body.email,
        subject: "Verification Code",
        text: "Your verification code is " + code + ". This code expires in 5 minutes."
    }

    stat = await Promise.all([ // Do them at the same time -
        DAO.addPotentialUser(req.body.email, code),
        EmlWrp.sendEmail(emailCfg)
    ]);

    response.json({done: true});

    setTimeout(() => { // Remove potential user after 5 mins
        DAO.removePotentialUser(req.body.email, code);
    }, 5 * 60 * 1000); // 5 minutes to millisec
});

recordRoutes.route("/submitCode").post(async function (req, response) {
    const verified = await DAO.verifyPotentialUser(req.body.email, req.body.code);

    if (verified) {
        await DAO.addUser(req.body.email, req.body.password)
        response.json({"registered": true})
    } else {
        response.status(400);
        response.json({ "error": "Code is incorrect", "registered": false});
    }
});

module.exports = recordRoutes;