const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const clubRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

/**
 * @module routes/clubs
 */

/** This section will help you get a list of all the records.
 *  @name /clubs
 */
clubRoutes.route("/clubs").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  db_connect
    .collection("clubs")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

/** This section will help you get a single record by id
 *  @name /clubs/:id
 */
clubRoutes.route("/clubs/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("clubs")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

/** This section will help you create a new record.
 *  @name /clubs/create
 */
clubRoutes.route("/clubs/create").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {

    clubName: req.body.clubName,
    clubDesc: req.body.clubDesc,
    clubPhone: req.body.clubPhone,
    email: req.body.email,
  };
  db_connect.collection("clubs").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

/** This section will help you update a record by id.
 * @name /clubs/:id
 */
clubRoutes.route("/clubs/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      clubName: req.body.clubName,
      clubDesc: req.body.clubDesc,
      clubPhone: req.body.clubPhone,
      email: req.body.email,
    },
  };
  db_connect
    .collection("clubs")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

/** This section will help you delete a record
 * @name /clubs/del/:id
 */
clubRoutes.route("/clubs/del/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("clubs").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = clubRoutes;