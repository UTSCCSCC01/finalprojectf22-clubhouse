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
  MyAccountsRoutes.route("/club/profile/:clubName").get(function (req, res) {
 let db_connect = dbo.getDb("main");
 let myquery = { clubName : req.params.clubName };
//  console.log(myquery);
 db_connect
   .collection("clubs")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

 


module.exports = MyAccountsRoutes;