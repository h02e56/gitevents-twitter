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
		// customFormat parameter is optional
		init : function(webhook, customFormat, cb){
			var self = this;

			// check if customFormat parameter has been provided - if not,
			// need to reassign cb parameter
			if (cb === undefined && customFormat !== undefined && typeof customFormat === 'function') {
				cb = customFormat;
				customFormat = undefined;
			}

			formatter(webhook, customFormat, function(err, res){
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
			// twitterRestClient.statusesUpdate(message, function(err, res) {
		 //        if (err) return cb('Error: ' + (err.code ? err.code + ' ' + err.message : err.message), null);
		 //        else cb(null, res);
			// })
		}
	}
	
}