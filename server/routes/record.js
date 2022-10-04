const { request } = require("express");
const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a club by email.
recordRoutes.route("/club").get(function (req, res) {
 let db_connect = dbo.getDb("main");
 let myquery = { email: 'test@mail.utoronto.ca' };
 db_connect
   .collection("clubs")
   .findOne(myquery,function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
recordRoutes.route("/club/profileimg").get(function (req, res) {
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
 recordRoutes.route("/club/picupdate").patch(function (req, response) {
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

recordRoutes.route("/club/events").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  var perpage = 3;
  var total =  db_connect.collection("events").count();
  var pages = Math.ceil(total/perpage);
  var pageNumber = (req.query.page == null) ? 1 : req.query.page;
  var startFrom = (pageNumber-1) * perpage;


  
  let myquery = {clubName:'Sports'};
  
  
  
  
  db_connect
    .collection("events")
    .find(myquery).sort({"id": -1 }).skip(startFrom).limit(perpage)
      .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
 
// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("records")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   position: req.body.position,
   level: req.body.level,
 };
 db_connect.collection("records").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("records")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;