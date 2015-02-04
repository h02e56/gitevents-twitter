var moment = require("moment");
var twttrtxt = require('node-twitter-text');

module.exports = function(webhook, cb){
	if(!webhook) return cb('should provide a webhook', null)
	
	var label = webhook.webhook.label;

	doFormat(label)

	function formatTalks(){
		var talks = webhook.event.talks
			, eventTwitter = webhook.event.twitter
			, eventDate = moment(webhook.event.date).format('L')
			, meetupURL = webhook.event.url

		talks.map(function(talk){
			var description = 'New talk: '+ makeid();
				// 	description += ' ' + eventDate
			// description += ' @' + talk.speaker.twitter
			// description += ' '+ twitter.autoLink(twitter.htmlEscape('talk.title'))

			talk.description = 'Angular in deepth. router, controller, views,  ';
				
			description += ' ' + 'www.test.com';
			
			var remainingCharacters = 140 - 3 - twttr.txt.getTweetLength(description);
			
			description += ' ' + talk.description.slice(0, remainingCharacters ) + ' ...'

			// description += '' + talk.description.slice(0, pendingChars).toLowerCase()
			//lets send it back to send it
			cb(null, description)
		})
	}
	  
	//different formatters depending on label hook(format)
	function doFormat(format) {
		var formats = {
			'talks': function talk () {
				console.log('talk')
			},
			'jobs': function jobs () {
				console.log('job')
			}
		}

		if(typeof formats[format] != 'function'){
			return cb("uknown label wook", null);
		}

		return formats[format]()
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