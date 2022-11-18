const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
const EmlWrp = require("../modules/emailWrapper");

/**
 * @module routes/users
 */

/** This section will help you get a list of all the records.
 *  @name /users
 */
userRoutes.route("/users").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

/** This section will help you get a single record by name
 *  @name /users/:name
 */
userRoutes.route("/users/:name").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { name: req.params.name };
  db_connect
    .collection("users")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

/** This section will help you delete a record by name
 * @name /users/del/:name
 */
userRoutes.route("/users/del/:name").delete((req, response) => {
  let db_connect = dbo.getDb("main");
  let myquery = { name: req.params.name };
  db_connect.collection("users").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = userRoutes;