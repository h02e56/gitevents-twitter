var moment = require("moment");

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
	
	function formatTalks(){
		var talks = webhook.event.talks
			, eventTwitter = webhook.event.twitter
			, eventDate = moment(webhook.event.date).format('L')
			, meetupURL = webhook.event.url

		talks.map(function(talk){
			var description = 'New'
			description += ' @' + eventTwitter + ' talk'
			description += ' ' + eventDate
			description += ' @' + talk.speaker.twitter
			description += ' '+ talk.title

			//rest 3 ... chars and actual tweet to see pending chars
			var pendingChars = 140 - 3  - meetupURL.length - description.length;

			
			// description += '' + talk.description.slice(0, pendingChars).toLowerCase()
			description += ' ' +  meetupURL

			//lets send it back to send it
			cb(null, description.toString())
		})
	}
	
	function formatJobs(){
		
	}    

}