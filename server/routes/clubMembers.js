const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const clubMemberRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
const EmlWrp = require("../modules/emailWrapper");

/**
 * @module routes/clubMembers
 */

/** This section will help you get a list of all the records.
 *  @name /club-members
 */
clubMemberRoutes.route("/club-members").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  db_connect
    .collection("club-members")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

/** This section will help you get a single record by id
 *  @name /club-members/:clubName
 */
clubMemberRoutes.route("/club-members/:clubName").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { clubName: req.params.clubName };
  db_connect
    .collection("club-members")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

/** This section will help you delete a record
 * @name /club-members/del/:clubName
 */
clubMemberRoutes.route("/club-members/del/:clubName").delete((req, response) => {
  let db_connect = dbo.getDb("main");
  let myquery = { clubName: req.params.clubName };
  db_connect.collection("club-members").deleteMany(myquery, function (err, obj) {
    if (err) throw err;
    console.log("Multiple documents deleted");
    response.json(obj);
  });
});

module.exports = clubMemberRoutes;