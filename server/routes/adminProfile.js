const { request } = require("express");
const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const adminPofileRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 /**
 * @module routes/adminProfile
 */

 /**
 * Retrives the club information for the corresponding clubName
 * @name /club/members/:clubName
 */
adminPofileRoutes.route("/club/profile/:clubName").get(function (req, res) {
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

 /**
 * Retrives the club profile picture for the corresponding clubName from the clubs collection
 * @name /club/profileimg/:clubName
 */
adminPofileRoutes.route("/club/profileimg/:clubName").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  let myquery = { clubName : req.params.clubName };
  db_connect
    .collection("clubs")
    .findOne(myquery,function (err, result) {
      if (err) throw err;
      res.json(result.image);
    });
 });

 /**
 * Updates the club profile picture for the corresponding clubName in the clubs collection
 * @name /club/picupdate/:clubName
 */
 adminPofileRoutes.route("/club/picupdate/:clubName").patch(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { clubName : req.params.clubName };
  let newvalues = {
    $set: {
      image: req.body.image,
    },
  };
  db_connect
    .collection("clubs")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
 });

  /**
 * Updates the club information for the corresponding clubName in the clubs collection
 * @name /club/profile/:id
 */
 adminPofileRoutes.route("/club/profile/:id").patch(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  console.log(myquery);
  let newvalues = {
    $set: {
      clubDesc: req.body.clubDesc,
      clubPhone: req.body.clubPhone,
      email: req.body.email,
    },
  };
  db_connect
    .collection("clubs")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      // console.log("1 document updated");
      response.json(res);
    });
 });

  /**
 * Retrives the events hosted by that club from the events database
 * @name /club/events
 */
 adminPofileRoutes.route("/club/events").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  var perpage = 20;
  var total =  db_connect.collection("events").count();
  var pages = Math.ceil(total/perpage);
  var pageNumber = (req.query.page == null) ? 1 : req.query.page;
  var startFrom = (pageNumber-1) * perpage;


  
  let myquery = {clubName: req.query.clubName};
  

  db_connect
    .collection("events")
    .find(myquery).sort({"id": -1 }).skip(startFrom).limit(perpage)
      .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
 


module.exports = adminPofileRoutes;