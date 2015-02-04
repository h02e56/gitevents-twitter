var giteventsTwitter = require('./index.js')();
var test = require('tape')

test('post talks tweet works', function(t){
	var fakeDataTalks = require('./sample_data.json')
	t.plan(2)
	giteventsTwitter.init(fakeDataTalks, function(err, res){
		t.ok(res, 'we get a response from server');
	})
});

test('post jobs tweet works', function(t){
	var fakeDataJobs = require('./sample_data_job.json')
	t.plan(2)
	giteventsTwitter.init(fakeDataJobs, function(err, res){
		t.ok(res, 'we get a response from server for jobs');
	})
});



