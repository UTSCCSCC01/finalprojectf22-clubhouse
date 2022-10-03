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
          correct = true;
        } else {
          correct = false;
        }
      }
      res.json( { valid: correct } );
    });
});
 
module.exports = loginRoutes;