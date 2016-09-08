const express = require("express");
const router = express.router();
var app = require('../Server.js');


router.route("/contacts")
      .all(function (req, res, next)
           {
	           console.log("main Middleware");
	           next();
           })//find all contacts
      .get(function (req, res, next)
           {

	           next();
           })
      .post(function (req, res)
            {
	            var newContact = req.body;
	            newContact.createDate = new Date();

	            if (!(req.body.firstName || req.body.lastName))
	            {
		            app.handleError(res, "Invalid input", "Must provide first or last name", 400)
	            }
            });


router.route("/contacts/:id")
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

		      next();
	      })//Update entire contact document
      .put(
	      function (req, res, next)
	      {

		      next();
	      })//Delete a contact by ID
      .delete(
	      function (req, res, next)
	      {

		      next();
	      });