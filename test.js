var giteventsTwitter = require('./index.js')();
var test = require('tape');

var talk = {
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
 };
function makeid(){
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 5; i++ )
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

test('post tweet works', function(t){
	t.plan(1)

	var res = false;


	giteventsTwitter.sendTweet(talk, function(err, data){
		if(err) {
			console.log(err);
		}else res=true
		
		t.equal(res, true);
	})
});





