var gitupTwitter = require('./index.js');
var test = require('tape');
var util = require('util')

test('conection to twitter api works', function(t){
	t.plan(1)

	gitupTwitter.test(function(err, data){
		var res
		if(err) res = false
		else res = true;

		t.equal(res, true);
	})
});

test('post twt api works', function(t){
	t.plan(1)

	var res = false;
	var fakeData = {
		status: 'test fake data'
	}

	gitupTwitter.upload(fakeData, function(err, data){
		if(err) {
			console.log(err);
		}else res=true
		
		t.equal(res, true);
	})


});




