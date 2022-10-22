const { DoneAllOutlined } = require("@mui/icons-material");
const express = require("express");

const loginRoutes = express.Router();

const dbo = require("../db/conn");
const DAO = require("../modules/userDAO");

/**
 * Handles submission of login form which provides
 * req.body.email = email
 * req.body.password = password
 * sets the cookie to the username if the login matches database.
 */
loginRoutes.route("/login").post(async function (req, res) {
  let valid = true;
  const user = await DAO.findUser(req.body.email);
  if (user == null) {
    valid = false;
  } else {
    if (user.password == req.body.password) {
      res.cookie("accountType", user.accountType, {maxAge: 3600000, sameSite: 'none', secure: true});
      res.cookie("username", req.body.email, {maxAge: 3600000, sameSite: 'none', secure: true});
    } else {
      valid = false;
    }
  }
  res.json({ "valid": valid, "username": req.body.email, "accountType": user.accountType});
});
/**
 * Checks if the user is logged in by checking cookie value.
 */
loginRoutes.route("/loginstatus").get(function (req, res) {
  var currentuser = req.cookies.username;
  if (currentuser != null) {
    res.send(req.cookies.username);
  } else {
    res.send(false);
  }
});

/**
 * Logs the user out by clearing cookie.
 */
loginRoutes.route("/logout").get(function (req, res) {
  res.clearCookie("username", {})
  res.end();
});

module.exports = loginRoutes;