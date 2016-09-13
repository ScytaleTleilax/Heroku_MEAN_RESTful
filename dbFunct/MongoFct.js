/**
 * Created by Scooby on 9/13/2016.
 */


exports.findAll = function(db , collection , res){

	db.collection(collection)
	  .find({})
	  .toArray()
	  .then(function(docs){
		  res.json(docs);
	  })
};

