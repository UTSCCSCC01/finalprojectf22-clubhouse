const { request } = require("express");
const express = require("express");

const clubMainRoutes = express.Router();
 
const dbo = require("../db/conn");
 
const ObjectId = require("mongodb").ObjectId;
/**
 * @module routes/clubMain
 */

/**
 * Retrives all club members from the club-members collection in the main database
 * @name /club/members
 */
clubMainRoutes.route("/club/members").get(function (req, res) {
    let db_connect = dbo.getDb("main");
    let myquery = {};
    db_connect
      .collection("club-members")
      .find(myquery).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
     
   });

   /**
 * Retrives all users applying to join the club from the clubApplicants collection in the main database
 * @name /club/potentialMembers
 */
   clubMainRoutes.route("/club/potentialMembers").get(function (req, res) {
    let db_connect = dbo.getDb("main");
    let myquery = {};
    db_connect
      .collection("clubApplicants")
      .find(myquery)
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });

     /**
 * Deletes the user with the id responding to req.params.id from the clubApplicants collection in the main database
 * @name /club/potentialMembers/:id
 */
   clubMainRoutes.route("/club/potentialMembers/:id").delete(function (req, res) {
    let db_connect = dbo.getDb("main");
    let myquery = { _id: ObjectId(req.params.id)  };
    db_connect
      .collection("clubApplicants")
      .deleteOne(myquery, function (err, result) {
        if (err) throw err;
      });
   });

     /**
 * Adds the user with the id responding to req.params.id to the club-members collection in the main database
 * @name /club/potentialMembers
 */
   clubMainRoutes.route("/club/potentialMembers").post(function (req, res) {
    let db_connect = dbo.getDb("main");
    let student = {
      clubName: req.body.clubName,
      clubEmail: req.body.clubEmail,
      email: req.body.email,
      userName: req.body.userName,
     };
    db_connect
      .collection("club-members")
      .insertOne(student, function (err, result) {
        if (err) throw err;
        console.log("Student added to club");
      });
   });



module.exports = clubMainRoutes;