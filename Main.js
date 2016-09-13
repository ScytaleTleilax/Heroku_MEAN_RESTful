var express = require('express')
    , path = require('path')
    , bodyParser = require('body-parser')
    , mongodb = require('mongodb')
    , ObjectID = mongodb.ObjectID
    , app = express();
var dotenv = require('dotenv');
dotenv.load();

exports.ObjectID = ObjectID;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
        //db instance is accesible everywhere because
        //app.locals is attached to the REQ object
        app.locals.db = database;
        console.log("Database connection ready");
    });


var server = app.listen(
    process.env.PORT || 8080, function () {
        console.log('app now running on port 8080');
    });