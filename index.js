var config = require('./config');

var Twitter = require('node-twitter');

module.exports = function(){
	
	var twitterRestClient = new Twitter.RestClient(
	    config.CONSUMER_KEY,
	    config.CONSUMER_SECRET,
	    config.TOKEN,
	    config.TOKEN_SECRET
	);

	var proto = {
		//just test conection works
		test: function(cb){
			twitterRestClient.statusesHomeTimeline({}, function(error, result) {
			    if (error){
			        cb('Error: ' + (error.code ? error.code + ' ' + error.message : error.message), null);
			    } if (result){
			        cb(null, result);
			    }
			});
		},
		//upload a new tweet
		upload: function(data, cb){
			twitterRestClient.statusesUpdate(data,
			    function(error, result) {
			        if (error){
			            cb('Error: ' + (error.code ? error.code + ' ' + error.message : error.message), null);
			        }if (result){
			            cb(null, result);
			        }
			    }
			)}
	}

	return Object.create(proto)

}

