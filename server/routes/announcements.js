const express = require("express");
const announcementRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

announcementRoutes.route("/announcements").get(

  /**
     * Endpoint that gets a list of all announcements
     * @param {express.Request} req 
     * @param {express.Response} res 
     */

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


announcementRoutes.route("/announcements/:id").get(

  /**
     * Endpoint that gets a single announcement by id
     * @param {express.Request} req 
     * @param {express.Response} res 
     */

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

announcementRoutes.route("/announcements/new").post(

  /**
     * Endpoint that creates a new announcement
     * @param {express.Request} req 
     * @param {express.Response} res 
     */

  function (req, response) {
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

module.exports = announcementRoutes;
