const express = require("express");
const announcementRoutes = express.Router();
const dbo = require("../db/conn");
const membershipDAO = require("../modules/membershipDAO");
const emailWrapper = require("../modules/emailWrapper")
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
     * Endpoint that creates a new announcement. Also sends out an email notification
     * @name /announcements/new
     */
announcementRoutes.route("/announcements/new").post(
  async function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      clubName: req.body.clubName,
      clubEmail: req.body.clubEmail,
      subject: req.body.subject,
      message: req.body.message,
      recipients: req.body.recipients,
      time: req.body.time,
    };

    let members = await membershipDAO.getMembersByClub(req.body.clubEmail);
    
    

    await Promise.all(members.map(element => { // send all email out at the same time
      if (element.emailNotifications != false) { // still yes if undefined
        let emailCfg = {
          from: "utscclubhouse@gmail.com",
          to: element.email,
          subject: "Notification from " + element.clubName + ": " + req.body.subject,
          text: req.body.message
        }

        return emailWrapper.sendEmail(emailCfg);
      }
    }));

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
