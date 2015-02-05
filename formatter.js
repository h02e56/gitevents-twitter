var moment = require("moment");
var twttr = require('twitter-text');

module.exports = function(webhook, cb){
	if(!webhook) return cb('should provide a webhook', null)
	
	var label = webhook.webhook.label;

	doFormat(label)

	//different formatters depending on label hook(format)
	function doFormat(format) {
		var formats = {

			'talk proposal': function talk () {
				var talks = webhook.event.talks
					, eventTwitter = webhook.event.twitter
					, eventDate = moment(webhook.event.date).format('L')
					, eventURL = webhook.event.url
					, testTweetFails
					, description= '';

				talks.map(function(talk){
					var talkDescription = talk.description;

					description = 'New talk:';

					//start text creation
					description += ' ' + eventURL;
					description += ' ' + talkDescription.slice(0, getRemainingChars(description)) + '...'
					
					//check tweet
					checkTweet(description, function(err, res){
						if(err) return cb(err, null)
						//send back our correct formatted tweet
						cb(null, description)
					})					
				})
			},

			'jobs': function jobs () {
				var jobs = webhook.jobs
					, description = ''

				jobs.map(function(job){
					var company = job.company
						, jobDescription = job.description;

					description = 'New job offer:';

					description += ' ' + company 
					description += ' ' + twttr.htmlEscape(jobDescription.slice(0, getRemainingChars(description))) + '...'

					//check tweet
					checkTweet(description, function(err, res){
						if(err) return cb(err, null)
						//send back our correct formatted tweet
						cb(null, description)
					})					
				})
			}
		}

		if(typeof formats[format] != 'function'){
			return cb("uknown label wook", null);
		}

		return formats[format]()
	} 

	function getRemainingChars(text){
		return 140 - 4 - twttr.getTweetLength(text);
	}

	//check if our tweet will be accepted bt the twitter api
	function checkTweet(text, cb){
		var testTweetFails = twttr.isInvalidTweet(text)
		if(testTweetFails) return cb(testTweetFails, null)
		return cb(null)
	}

	//just to create a different tweet than previous
	function makeid(){
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for( var i=0; i < 5; i++ )
		    text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}
}