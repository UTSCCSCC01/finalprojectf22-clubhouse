const express = require("express");
const announcementRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

/**
 * @module routes/announcements
 */

  /**
     * Endpoint that gets a list of all announcements
     * @name /announcements 
     */
announcementRoutes.route("/announcements").get(



  function (req, res) {
    let db_connect = dbo.getDb("main");
    db_connect
      .collection("announcements")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

  /**
     * Endpoint that gets a single announcement by id
     * @name /announcements/:id
     */
announcementRoutes.route("/announcements/:id").get(



  function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
      .collection("announcements")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

/**
     * Endpoint that creates a new announcement
     * @name /announcements/new
     */
announcementRoutes.route("/announcements/new").post(

  

  function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      clubName: req.body.clubName,
      clubEmail: req.body.clubEmail,
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

/**
     * Endpoint that deletes a single announcement given an id
     * @name /:id
     */
announcementRoutes.route("/:id").delete(
  (req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("announcements").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
  });

module.exports = announcementRoutes;
