var moment = require("moment");
var twttrtxt = require('node-twitter-text');


module.exports = function(webhook, cb){
	
	if(!webhook) return cb('should provide a webhook', null)
	
	var label = webhook.webhook.label;

	switch (label) {
	  case 'talk proposal':
	    formatTalks()
	    break;
	  case 'jobs':
	    formatJobs()
	    break;
	  default:
	    return cb("uknown label wook", null);
	}
	function makeid(){
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for( var i=0; i < 5; i++ )
		    text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}

	function formatTalks(){
		var talks = webhook.event.talks
			, eventTwitter = webhook.event.twitter
			, eventDate = moment(webhook.event.date).format('L')
			, meetupURL = webhook.event.url

		talks.map(function(talk){
			var description = 'New talk:'+ makeid();
				// 	description += ' ' + eventDate
			// description += ' @' + talk.speaker.twitter
			// description += ' '+ twitter.autoLink(twitter.htmlEscape('talk.title'))

			talk.description = 'Angular in deepth. router, controller, views,  ';
				
			description += ' ' + 'www.test.com';
			debugger
			var remainingCharacters = 140 - 3 - description.length;
			console.log(remainingCharacters)
			description += ' ' + talk.description.slice(0, remainingCharacters ) + ' ...'

			
			// var desc = talk.description;
			// var formatyted = twttrtxt.autoLink('New talk http://www.meetup.com', {
			//     urlEntities: [
			//         {
			//           "url": null,
			//           "display_url": talk.title,
			//           "expanded_url": talk.url,
			//           "indices": [
			//             9,
			//             20
			//           ]
			//         }
			//  ]});

		
						

			//rest 3 ... chars and actual tweet to see pending chars
			

			
			// description += '' + talk.description.slice(0, pendingChars).toLowerCase()
			

			//lets send it back to send it
			cb(null, description)
		})
	}
	
	function formatJobs(){
		
	}    

}