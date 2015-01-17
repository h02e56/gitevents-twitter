var gitupTwitter = require('./index.js')();
var test = require('tape');
var util = require('util')

test('post tweet works', function(t){
	t.plan(1)

	var res = false;
	var fakeData = {
		status: 'test fake data2'
	}

	gitupTwitter.sendTweet(fakeData, function(err, data){
		if(err) {
			console.log(err);
		}else res=true
		
		t.equal(res, true);
	})
});




