const { request } = require("express");
const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const MyAccountsRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 /**
 * @module routes/MyAccounts
 */

 /**
 * Retrives the club information for the corresponding clubName
 * @name /club/members/:clubName
 */
  MyAccountsRoutes.route("/club/myevents/:email").get(async function (req, res) {
    let db_connect = dbo.getDb("main");
    let myquery = { eventAttendees: req.params.email };
    // let myquery={};
    db_connect
      .collection("events")
      .find(myquery).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
     
   });

 


module.exports = MyAccountsRoutes;