var gitupTwitter = require('./index.js')();
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



test('post api works', function(t){
	t.plan(1)

	gitupTwitter.upload({
	        'status': 'Posting a tweet w/ attached media.'
	    },
	    function(err, data){
			var res
			if(err) {
				res = false
				console.log(err)	
			}
			else res = true;

			t.equal(res, false);
	})
});




