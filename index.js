var config = require('./config');

var Twitter = require('node-twitter');

var twitterRestClient = new Twitter.RestClient(
    config.CONSUMER_KEY,
    config.CONSUMER_SECRET,
    config.TOKEN,
    config.TOKEN_SECRET
);

module.exports =  {
	//just test conection works
	test: function(cb){
		twitterRestClient.statusesHomeTimeline({}, function(err, res) {
		    if (err){
		        cb('Error: ' + (err.code ? err.code + ' ' + err.message : err.message), null);
		    } if (res){
		        cb(null, res);
		    }
		});
	},
	//upload a new tweet
	upload: function(data, cb){
		twitterRestClient.statusesUpdate(data, function(err, res) {
	        if (err){
	            cb('Error: ' + (err.code ? err.code + ' ' + err.message : err.message), null);
	        }if (res){
	            cb(null, res);
	        }
		})
	}
}