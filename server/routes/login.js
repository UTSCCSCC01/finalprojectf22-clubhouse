const express = require("express");

const loginRoutes = express.Router();

const dbo = require("../db/conn");
 
const ObjectId = require("mongodb").ObjectId;

loginRoutes.route("/login").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { email: req.body.email };
  db_connect
    .collection("users")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      var correct;
      if (result == null) {
        correct = false;
      } else {
        if (result.password == req.body.password) {
          res.cookie("username", req.body.email, {maxAge: 3600000}); // httpOnly: true, signed: true}
          correct = true;
        } else {
          correct = false;
        }
      }
      res.json( { valid: correct } );
    });
});

loginRoutes.route("/loginstatus").get(function (req, res) {
  var currentuser = req.cookies.username;
  if (currentuser != null) {
    res.send(req.cookies.username);
  } else {
    res.send(false);
  }
});

loginRoutes.route("/logout").get(function (req, res) {
  res.clearCookie("username", {})
  res.end();
});

module.exports = loginRoutes;