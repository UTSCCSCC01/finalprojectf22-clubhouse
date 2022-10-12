const express = require("express");
const announcementRoutes = express.Router();
const dbo = require("../db/conn");
 const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the announcements.
announcementRoutes.route("/announcements").get(function (req, res) {
 let db_connect = dbo.getDb("main");
 db_connect
   .collection("announcements")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you get a single announcement by id
announcementRoutes.route("/announcements/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("announcements")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new announcement.
announcementRoutes.route("/announcements/new").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    clubName: req.body.clubName,
    subject: req.body.subject,
    message: req.body.message,
    recipients: req.body.recipients,
    time: req.body.time,
  };
  db_connect.collection("announcements").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you delete an announcement
announcementRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("announcements").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});
 
module.exports = announcementRoutes;
