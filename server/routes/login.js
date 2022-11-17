const { DoneAllOutlined } = require("@mui/icons-material");
const express = require("express");

const loginRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

const userDAO = require("../modules/userDAO");
const clubDAO = require("../modules/clubDAO");
const EmlWrp = require("../modules/emailWrapper");
/**
 * @module routes/login
 */


/**
 * Handles submission of login form which provides
 * req.body.email = email
 * req.body.password = password
 * sets the cookie to the username if the login matches database.
 * @name /login
 */
loginRoutes.route("/login").post(async function (req, res) {
  let valid = true;
  const user = await userDAO.findUser(req.body.email);
  if (user == null) {
    valid = false;
  } else {
    if (user.password == req.body.password) {
      if (user.accountType === "club") {
        const club = await clubDAO.findClub(req.body.email);
        res.cookie("clubName", club.clubName, {maxAge: 3600000, sameSite: 'none', secure: true});
      }
      res.cookie("accountType", user.accountType, {maxAge: 3600000, sameSite: 'none', secure: true});
      res.cookie("username", req.body.email, {maxAge: 3600000, sameSite: 'none', secure: true});
    } else {
      valid = false;
    }
  }
  if (valid) {
    res.json({ "valid": valid, "username": req.body.email, "accountType": user.accountType});
  } else {
    res.json({ "valid": valid });
  }
});
/**
 * Checks if the user is logged in by checking cookie value.
 * @name /loginstatus
 */
loginRoutes.route("/loginstatus").get(function (req, res) {
  var currentuser = req.cookies.username;
  var accountType = req.cookies.accountType;
  if (currentuser != null) {
    if (accountType === "club") {
      var clubName = req.cookies.clubName;
      res.json({"username":req.cookies.username, "accountType":accountType, "clubName":clubName});
    } else {
      res.json({"username":req.cookies.username, "accountType":accountType});
    }
  } else {
    res.send(false);
  }
});
/** This section will help you create a new record.
 *  @name /logincreate
 */
loginRoutes.route("/logincreate").post(async function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    accountType: req.body.accountType,
  };

  // let emailCfg = {
  //   from: "utscclubhouse@gmail.com",
  //   to: req.body.email,
  //   subject: "Your club registration request",
  //   text: 'Dear '+ req.body.name + ', We wish to inform you that your registration request has been approved. Please use the following credentials to log in and reset your password. email: ' + req.body.email + 'password: ' + req.body.password + '. Best, SCSU'
  // };

  // stat = await Promise.all([
  //   EmlWrp.sendEmail(emailCfg)
  // ]);

  db_connect.collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

/**
 * Logs the user out by clearing cookie.
 * @name /logout
 */
loginRoutes.route("/logout").get(function (req, res) {
  res.clearCookie("username", {});
  res.clearCookie("accountType", {});
  res.clearCookie("clubName", {});
  res.send(true);
});

module.exports = loginRoutes;