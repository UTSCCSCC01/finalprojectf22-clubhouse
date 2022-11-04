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
 
 
// This section will help you get a club by email.
adminPofileRoutes.route("/club").get(function (req, res) {
 let db_connect = dbo.getDb("main");
 let myquery = { email: 'test@mail.utoronto.ca' };
 db_connect
   .collection("clubs")
   .findOne(myquery,function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
adminPofileRoutes.route("/club/profileimg").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  let myquery = { email: 'test@mail.utoronto.ca' };
  db_connect
    .collection("clubs")
    .findOne(myquery,function (err, result) {
      if (err) throw err;
      res.json(result.image);
    });
 });
 //update--------
 adminPofileRoutes.route("/club/picupdate").patch(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { email:'test@mail.utoronto.ca'};
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

 adminPofileRoutes.route("/club/events").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  var perpage = 3;
  var total =  db_connect.collection("events").count();
  var pages = Math.ceil(total/perpage);
  var pageNumber = (req.query.page == null) ? 1 : req.query.page;
  var startFrom = (pageNumber-1) * perpage;


  
  let myquery = {clubName: req.query.clname};
  
  
  
  
  db_connect
    .collection("events")
    .find(myquery).sort({"id": -1 }).skip(startFrom).limit(perpage)
      .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
 




 

module.exports = adminPofileRoutes;