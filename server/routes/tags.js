const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const tagRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 

// This section will help you get a list of all the tags.
tagRoutes.route("/tags").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  db_connect
    .collection("tags")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 tagRoutes.route("/clubtags").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  db_connect
    .collection("clubTags")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 
module.exports = tagRoutes;
