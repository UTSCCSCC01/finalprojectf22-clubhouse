const { request } = require("express");
const express = require("express");

const clubMainRoutes = express.Router();
 
const dbo = require("../db/conn");
 
const ObjectId = require("mongodb").ObjectId;

clubMainRoutes.route("/club/members").get(function (req, res) {
    let db_connect = dbo.getDb("main");
    let myquery = { clubname: "Sports" };
    db_connect
      .collection("club-members")
      .findOne(myquery,function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });

module.exports = clubMainRoutes;