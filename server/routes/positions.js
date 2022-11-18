const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const positionsRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
positionsRoutes.route("/positions").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  db_connect
    .collection("positions")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
positionsRoutes.route("/positions/find").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("positions")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
positionsRoutes.route("/positions/create").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {

    clubName: req.body.clubName,
    jobPosition: req.body.jobPosition,
    jobDescription: req.body.jobDescription,
    jobRequirements: req.body.jobRequirements,
    email: req.body.email,
    clubImage: req.body.clubImage,
  };
  db_connect.collection("positions").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
positionsRoutes.route("/positions/update").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      clubName: req.body.clubName,
      jobPosition: req.body.jobPosition,
      jobDescription: req.body.jobDescription,
      jobRequirements: req.body.jobRequirements,
      email: req.body.email,
      clubImage: req.body.clubImage,
    },
  };
  db_connect
    .collection("positions")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
positionsRoutes.route("/delete").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("positions").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

/** This section will help you get a single record by id
 *  @name /positions/:clubName
 */
 positionRoutes.route("/positions/:clubName").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { clubName: req.params.clubName };
  db_connect
    .collection("positions")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

/** This section will help you delete a record
 * @name /positions/del/:clubName
 */
 positionRoutes.route("/positions/del/:clubName").delete((req, response) => {
  let db_connect = dbo.getDb("main");
  let myquery = { clubName: req.params.clubName };
  db_connect.collection("positions").deleteMany(myquery, function (err, obj) {
    if (err) throw err;
    console.log("Multiple documents deleted");
    response.json(obj);
  });
});
 

module.exports = positionsRoutes;