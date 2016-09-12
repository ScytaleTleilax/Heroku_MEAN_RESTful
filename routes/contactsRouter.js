var express = require("express");
var router = express.Router();
var Server = require('./../Main');

/*Http://127.0.0.1:8080/contacts*/
router.route("/")
      .all(function (req, res, next) {
	      console.log("main Middleware");
	      next();
      })//find all contacts
      .get(function (req, res, next) {
	      res.send("GET /contacts");
	      next();
      })
      .post(function (req, res, next) {
	      var newContact = req.body;
	      if (!(req.body.firstName || req.body.lastName)) {
		      Server.handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
	      }
	
	      Server.db.collection("contacts")
	            .insertOne(newContact, function (err, doc) {
		            if (err) {
			            Server.handleError(res, err.message, "Failed to create new contact.");
		            }
		            else {
			            res.status(201)
			               .json(doc.ops[0]);
		            }
	            });
	      next();
      });

router.route("/:id")
      .all(
	      function (req, res, next) {
		      var time = new Date().getDate()
		                           .toString();
		      console.log(time);
		      next();
	      })//find a single contact by ID
      .get(
	      function (req, res, next) {
		      res.send("GET /contacts/" + req.params.id);
		      next();
	      })//Update entire contact document
      .put(
	      function (req, res, next) {
		      res.send("PUT /contacts/" + req.params.id);
		      next();
	      })//Delete a contact by ID
      .delete(
	      function (req, res, next) {
		      res.send("DELETE /contacts/" + req.params.id);
		      next();
	      });

module.exports = router;