var giteventsTwitter = require('./index.js')();
var test = require('tape');

test('post tweet works', function(t){
	t.plan(1)

	var res = false;
	var fakeData = {
		status: 'test fake dat2' + makeid()
	}

	giteventsTwitter.sendTweet(fakeData, function(err, data){
		if(err) {
			console.log(err);
		}else res=true
		
		t.equal(res, true);
	})

	function makeid()
	{
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < 5; i++ )
		    text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}
});




