var express = require('express')
	, path = require('path')
	, bodyParser = require('body-parser')
	, mongodb = require('mongodb')
	, ObjectID = mongodb.ObjectID
	, app = express();
var dotenv = require('dotenv');


dotenv.load();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//http://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get
app.use('/contacts', require('./routes/contactsRouter'));

//Seting DB_URI from .env file
app.locals.MONGODB_URI = process.env.MONGODB_URI;


mongodb.MongoClient.connect(
	app.locals.MONGODB_URI, function (err, database) {
		if (err) {
			console.log(err);
			process.exit(1);
		}
		// Save database object from the callback for reuse.

		//app.locals.db = database;
		exports.db = database;
		console.log("Database connection ready");
	});

var server = app.listen(
	process.env.PORT || 8080, function () {
		console.log('app now running on port 8080');
	});

//generic error handler
exports.handleError = function (res, reason, message, code) {
	console.log("ERROR:" + reason);
	res.status(code || 500)
	   .json({"error": message, "reason": reason});
};