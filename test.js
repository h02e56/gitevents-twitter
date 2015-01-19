var giteventsTwitter = require('./index.js')();
var test = require('tape')
var fakeData = require('./sample_data.json')
/*
just for create a different twitter text
 */
function makeid(){
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for( var i=0; i < 5; i++ )
	    text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}

test('post tweet works', function(t){
	t.plan(1)
	giteventsTwitter.sendTweet(fakeData, function(err, res){
		t.ifError(err, err)
		t.ok(res, 'we get a response from server');
	})
});





