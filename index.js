var Twitter = require('node-twitter');

module.exports =  function(config){
	
	var config = config || require('./config');

	if (!config.twitter) {
	    throw new Error('No twitter configuration found');
	}

	debugger;
	var twitterRestClient = new Twitter.RestClient(
    	config.twitter.consumer_key,
	    config.twitter.consumer_secret,
	    config.twitter.token,
	    config.twitter.token_secret
	);

	return {
		//upload a new tweet
		sendTweet: function(data, cb){
			twitterRestClient.statusesUpdate(data, function(err, res) {
		        if (err){
		            cb('Error: ' + (err.code ? err.code + ' ' + err.message : err.message), null);
		        }if (res){
		            cb(null, res);
		        }
			})
		}
	}
	
}