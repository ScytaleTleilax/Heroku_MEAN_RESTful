const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in app.
var db;

process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/';
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

// Save database object from the callback for reuse.
db = database;
console.log("Database connection ready");

var server = app.listen(process.env.PORT || 8080, function () {
    console.log("app now running on port ${server.address().port}")
});

//generic error handler

function handleError(res,reason,message,code){
    console.log("ERROR:"+reason);
    res.status(code || 500).json({"error":message,"reason":reason});
}

//http://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get
app.use('/contacts',require('./routes/contacts'));
app.use('/contacts/:id',require('./routes/contactsID'));













