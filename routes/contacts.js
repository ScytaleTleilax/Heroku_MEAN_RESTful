var express = require("express");
var router = express.Router();
var app = require('./../Server.js');


router.route("/")
      .all(function (req, res, next)
           {
	           console.log("main Middleware");
	           next();
           })//find all contacts
      .get(function (req, res, next)
           {
	           res.send("GET /contacts");
	           next();
           })
      .post(function (req, res, next)
            {
	            res.send("POST /contacts");
	            next();
	            /*	            var newContact = req.body;
	             newContact.createDate = new Date();

	             if (!(req.body.firstName || req.body.lastName))
	             {
	             app.handleError(res, "Invalid input", "Must provide first or last name", 400)
	             }*/
            });


router.route("/:id")
      .all(
	      function (req, res, next)
	      {
		      var time = new Date().getDate()
		                           .toString();
		      console.log(time);
		      next();
	      })//find a single contact by ID
      .get(
	      function (req, res, next)
	      {
		      res.send("GET /contacts/" + req.params.id);
		      next();
	      })//Update entire contact document
      .put(
	      function (req, res, next)
	      {
		      res.send("PUT /contacts/" + req.params.id);
		      next();
	      })//Delete a contact by ID
      .delete(
	      function (req, res, next)
	      {
		      res.send("DELETE /contacts/" + req.params.id);
		      next();
	      });

module.exports = router;