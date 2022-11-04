const { request } = require("express");
const express = require("express");

const MyClubsRoutes = express.Router();
 
const dbo = require("../db/conn");
 
const ObjectId = require("mongodb").ObjectId;
/**
 * @module routes/myClubs

/**
 * Retrives all club members of the club from the club-members collection in the main database
 * @name /club/members/:clubName
 */
myClubsRoutes.route("/club/members/:clubName").get(async function (req, res) {
    let db_connect = dbo.getDb("main");
    let myquery = { clubName: req.params.clubName };
    // let myquery={};
    db_connect
      .collection("club-members")
      .find(myquery).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
     
   });

/**
 * Retrives all club members of the club from the club-members collection in the main database
 * @name /club/members/:email
 */
 myClubsRoutes.route("/club/members/:email").get(async function (req, res) {
    let db_connect = dbo.getDb("main");
    let myquery = { email: req.params.email };
    // let myquery={};
    db_connect
      .collection("club-members")
      .find(myquery).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
     
   });

module.exports = myClubsRoutes;