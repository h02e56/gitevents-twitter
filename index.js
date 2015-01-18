var Twitter = require('node-twitter');

var talks = {
  'date': '2014-02-12T23:00:00.000Z',
  'event': {
  	'name': 'My awesome event',
  	'date': '2015-02-12T12:00:00.000Z'	
  },
  'talks': [{
    'title': 'Using the API Blueprint to generate nodejs consumers',
    'speaker': {
      'twitter': 'bpedro',
      'name': 'Bruno Pedro',
      'portrait': 'https://pbs.twimg.com/profile_images/378800000473642830/2f20ecdcd1ec41452b174d04a69e87ee.jpeg'
    },
    'level': 'Intermediate',
    'language': 'en',
    'git': '',
    'slides': 'http://www.slideshare.net/bpedro/api-code-generation',
    'video': 'https://vimeo.com/87488883',
    'description': 'I\'ll show you how to generate a nodejs API consumer by using the API Blueprint (http://apiblueprint.org/) to generate code from a Postman (http://www.getpostman.com/) collection.'
  }]
};

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