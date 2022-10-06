const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const eventRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
eventRoutes.route("/events").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  db_connect
    .collection("events")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
eventRoutes.route("/events/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("events")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
eventRoutes.route("/events/create").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    clubName: req.body.clubName,
    eventName: req.body.eventName,
    eventDesc: req.body.eventDesc,
    eventLoc: req.body.eventLoc,
    // eventJoin: req.body.eventJoin,
    eventStartTime: req.body.eventStartTime,
    eventEndTime: req.body.eventEndTime,
    eventTags: req.body.eventTags,
  };
  db_connect.collection("events").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
eventRoutes.route("/events/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      clubName: req.body.clubName,
      eventName: req.body.eventName,
      eventDesc: req.body.eventDesc,
      eventLoc: req.body.eventLoc,
      // eventJoin: req.body.eventJoin,
      eventStartTime: req.body.eventStartTime,
      eventEndTime: req.body.eventEndTime,
      eventTags: req.body.eventTags,
    },
  };
  db_connect
    .collection("events")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
eventRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("events").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = eventRoutes;