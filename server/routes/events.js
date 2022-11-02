const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const eventRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
/**
 * @module routes/events
 */
 
/** This section will help you get a list of all the records.
 *  @name /events
 */
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
    .sort('eventStartTime')
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// /** This section will help you get a single record by id
//  *  @name /events/:id
//  */
// eventRoutes.route("/events/:id").get(function (req, res) {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId(req.params.id) };
//   db_connect
//     .collection("events")
//     .findOne(myquery, function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// });

/** This section will help you create a new record.
 *  @name /events/create
 */
eventRoutes.route("/events/create").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {

    clubName: req.body.clubName,
    eventName: req.body.eventName,
    eventImage: req.body.eventImage,
    eventDesc: req.body.eventDesc,
    eventLoc: req.body.eventLoc,
    // eventJoin: req.body.eventJoin,
    eventStartTime: req.body.eventStartTime,
    eventEndTime: req.body.eventEndTime,
    eventTags: req.body.eventTags,
    eventAttendees: req.body.eventAttendees,
  };
  db_connect.collection("events").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

/** This section will help you update a record by id.
 *  @name /events/:id
 */
eventRoutes.route("/events/:id/add").patch(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $addToSet: {
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

eventRoutes.route("/events/:id/remove").patch(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $pull: {
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



/** This section will help you delete a record
 *  @name /events/del/:id
 */
eventRoutes.route("/events/del/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("events").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

// module.exports = eventRoutes;

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

 eventRoutes.route("/eventsNone").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  db_connect
    .collection("eventsNone")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 }); 
 
module.exports = eventRoutes;
