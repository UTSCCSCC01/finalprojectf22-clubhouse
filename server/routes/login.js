const express = require("express");

const loginRoutes = express.Router();

const dbo = require("../db/conn");
 
const ObjectId = require("mongodb").ObjectId;

/**
 * Handles submission of login form which provides
 * req.body.email = email
 * req.body.password = password
 * sets the cookie to the username if the login matches database.
 */
loginRoutes.route("/login").post(function (req, res) {
  let club = false;
  let db_connect = dbo.getDb();
  let myquery = { email: req.body.email };
  db_connect
    .collection("clubs")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      if (result != null) {
        club = true;
      }
    });
  myquery = { email: req.body.email };
  db_connect
    .collection("users")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      var correct;
      if (result == null) {
        correct = false;
      } else {
        if (result.password == req.body.password) {
          let cookiestring = req.body.email;
          if (club) {
            cookiestring = "CLUB"+cookiestring;
          } else {
            cookiestring = "USER"+cookiestring;
          }
          res.cookie("username", cookiestring, {maxAge: 3600000}); // test httpOnly: true, signed: true for security
          correct = true;
        } else {
          correct = false;
        }
      }
      res.json( { valid: correct } );
    });
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