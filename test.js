var giteventsTwitter = require('./index.js')();
var test = require('tape');

test('post tweet works', function(t){
	t.plan(1)

	var res = false;
	var fakeData = {
		status: 'test fake dat2' + Math.random(233333);
	}

	giteventsTwitter.sendTweet(fakeData, function(err, data){
		if(err) {
			console.log(err);
		}else res=true
		
		t.equal(res, true);
	})
});




