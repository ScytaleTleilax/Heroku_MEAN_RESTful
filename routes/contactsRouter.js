var express = require("express");
var router = express.Router();
var Server = require('./../Main');
var MongoFct = require('./../DbFunct/MongoFct');
var Err = require('./../ErrHandle/genericErr');
var db;

/*Http://127.0.0.1:8080/contacts*/
router.route("/")

    .all(function (req, res, next) {

        db = req.app.locals.db;
        return next();
    })
    //find all contacts
    .get(function (req, res) {
        MongoFct.findAll(db, 'contacts', res)
    })
    .post(function (req, res, next) {

        var newContact = req.body;
        if (!(req.body.firstName && req.body.lastName)) {
            Err.handleError(res, "Invalid user input", "Must provide a first or last name.", 400);

            //pass REQ && RES objects down the Middleware Pipe
            return next();
        }
        else {
            MongoFct.insertOne(db, 'contacts', res, newContact);
        }
    });

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */
router.route("/:id")
    .all(
        function (req, res, next) {

            var time = new Date().getDate()
                .toString();
            console.log(time);
            next();
        })
    //find a single contact by ID
    .get(
        function (req, res) {
            MongoFct.findOne(db, 'contacts', req, res);
        })
    //Update entire contact document
    .put(
        function (req, res) {

            var updateDoc = req.body;
            delete updateDoc._id;

        })
    //Delete a contact by ID
    .delete(
        function (req, res) {
            MongoFct.deleteOne(db, 'contacts', req, res);
        });

module.exports = router;