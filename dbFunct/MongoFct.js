/**
 * Created by Scooby on 9/13/2016.
 */
var Server = require('./../ErrHandle/genericErr');

exports.findAll = function (db, collection, res) {

    db.collection(collection)
        .find({})
        .toArray()
        .then(function (docs) {
            res.status(200).json(docs);
        })
};

exports.insertOne = function (db, collection, res, doc) {

    db.collection(collection)
        .insertOne(doc, function (err, doc) {

            if (err) {
                Server.handleError(res, err.message, "Failed to create new contact.");
            } else {
                return res.status(200)
                    .json(doc.ops[0]);
            }
        })
};

exports.findOne = function (db, collection, req, res) {

    db.collection(collection)
        .findOne({_id: new ObjectID(req.params.id)}, function (err, doc) {

            if (err) {
                Server.handleError(res, err.message, "Failed to find contact.");
            } else {
                return res.status(200)
                    .json(doc.ops[0]);
            }
        })
};

exports.updateOne = function (db, collection, req, res, updateDoc) {

    db.collection(collection)
        .updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function (err, doc) {

            if (err) {
                Server.handleError(res, err.message, "Failed to update contact.");
            } else {
                res.status(204).end();
            }
        })
};

exports.deleteOne = function (db, collection, req, res) {

    db.collection(collection)
        .deleteOne({_id: new ObjectID(req.params.id)}, function (err) {

            if (err) {
                Server.handleError(res, err.message, "Failed to delete contact.");
            } else {
                res.status(204).end();
            }
        })
};
























