const express = require("express");
const newClubRequestRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

const userDAO = require("../modules/userDAO");
const clubDAO = require("../modules/clubDAO");
const EmlWrp = require("../modules/emailWrapper");
 
/**
 * @module routes/newClubRequest
 */

/** This section will help you get a list of all the club signup requests.
 *  @name /clubs/register-request
 */
 newClubRequestRoutes.route("/register-request").get(function (req, res) {
    let db_connect = dbo.getDb("main");
    db_connect
        .collection("club-registration-requests")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

/** This section will help you create a new club signup request.
 *  @name /clubs/register-request/create
 */
 newClubRequestRoutes.route("/clubs/register-request/create").post(async function (req, response) {
    let db_connect = dbo.getDb();

    const isNameTaken = await clubDAO.isClubNameTaken(req.body.clubName);
    const isEmailTaken = (await userDAO.findUser(req.body.email)) !== null;

    if (isNameTaken || isEmailTaken) {
        response.json({failed: true, nameTaken: isNameTaken, emailTaken: isEmailTaken});
        return;
    }

    let myobj = {

        clubName: req.body.clubName,
        clubEmail: req.body.email,
        clubPhone: req.body.phone,
        clubTags: req.body.tags,
        clubDesc: req.body.desc,
        password: req.body.password,

    };

    db_connect.collection("club-registration-requests").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

/** This section will help you delete a record
 *  @name /clubrequestdel/:id
 */
newClubRequestRoutes.route("/clubrequestdel/:id").delete(async function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    
    let emailCfg = {
        from: "utscclubhouse@gmail.com",
        to: req.body.email,
        subject: "Your club registration request",
        text: req.body.text,
      }
    
      stat = await EmlWrp.sendEmail(emailCfg);

    db_connect.collection("club-registration-requests").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
  });


module.exports = newClubRequestRoutes;