var express  = require("express");
var router   = express.Router();
var Server   = require('./../Main');
var MongoFct = require('./../DbFunct/MongoFct');
var Err      = require('./../ErrHandle/genericErr');


var db;

/*Http://127.0.0.1:8080/contacts*/
router.route("/")

      .all(function(req , res , next){

	      db = req.app.locals.db;
	      return next();
      })

      //find all contacts
      .get(function(req , res){

	      MongoFct.findAll(db , 'contacts' , res)
      })

      .post(function(req , res , next){
	      var newContact = req.body;
	      if(! (req.body.firstName && req.body.lastName)){
		      Err.handleError(res , "Invalid user input" , "Must provide a first or last name." , 400);
		
		      //pass REQ && RES objects down the Middleware Pipe
		      return next();
	      }

	      db.collection("contacts")
	        .insertOne(newContact , function(err , doc){
		        if(err){
			        Server.handleError(res , err.message , "Failed to create new contact.");
		        }
		        else{
			        return res.status(201)
			                  .json(doc.ops[0]);
		        }
	        });
      });


router.route("/:id")
      .all(
	      function(req , res , next){
		      var time = new Date().getDate()
		                           .toString();
		      console.log(time);
		      next();
	      })//find a single contact by ID

      .get(
	      function(req , res , next){
		      res.send("GET /contacts/" + req.params.id);

	      })//Update entire contact document

      .put(
	      function(req , res , next){
		      res.send("PUT /contacts/" + req.params.id);

	      })//Delete a contact by ID

      .delete(
	      function(req , res , next){
		      res.send("DELETE /contacts/" + req.params.id);
	      });

module.exports = router;