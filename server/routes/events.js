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

eventRoutes.route("/eventssortByDate").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  db_connect
    .collection("events")
    .find({})
    .sort('eventDate')
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 eventRoutes.route("/eventssortByClubs").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  db_connect
    .collection("events")
    .find({})
    .sort('clubName')
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 eventRoutes.route("/eventssortByCategories").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  db_connect
    .collection("events")
    .find({})
    .sort('clubName')
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });


 
// This section will help you update a record by id.for sign up
eventRoutes.route("/events/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    clubName: req.body.clubName,
    eventName: req.body.eventName,
    eventDesc: req.body.eventDesc,
    eventJoin: req.body.eventJoin,
    eventStartTime: req.body.eventStartTime,
    eventEndTime: req.body.eventEndTime,
    eventTags: req.body.eventTags,
    eventLoc: req.body.eventLoc,
    eventImage: req.body.eventImage,
    eventAttendees: req.body.eventAttendees,
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
 
 
module.exports = eventRoutes;
