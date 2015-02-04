var Twitter = require('node-twitter');
var formatter = require('./formatter');

module.exports =  function(config){
	
	var config = config || require('./config');

	if (!config.twitter) {
	    throw new Error('No twitter configuration found');
	}

	var twitterRestClient = new Twitter.RestClient(
    	config.twitter.consumer_key,
	    config.twitter.consumer_secret,
	    config.twitter.token,
	    config.twitter.token_secret
	);

	return {
		//
		init : function(webhook, cb){
			var self = this
			formatter(webhook, function(err, res){
				debugger
				if(err) throw new Error(err)
				self.send(res, cb)
			})
		},
		//send tweet
		send: function(data, cb){
			//twitter data object format
			var message = {
				status: data
			}
			twitterRestClient.statusesUpdate(message, function(err, res) {
		        if (err) return cb('Error: ' + (err.code ? err.code + ' ' + err.message : err.message), null);
		        else cb(null, res);
			})
		}
	}
	
}