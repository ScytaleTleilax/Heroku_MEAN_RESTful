/**
 * Created by Scooby on 9/13/2016.
 */


//generic error handler
exports.handleError = function(res , reason , message , code){
	console.log("ERROR:" + reason);
	res.status(code || 500)
	   .json({"error" : message , "reason" : reason});

};