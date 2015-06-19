var giteventsTwitter = require('./index.js')(
//{
  //NOTE: If you uncomment these lines and change them to valid values,
  //      DO NOT update this file on github. Alternatively, edit the config.js file,
  //      which will be automatically picked up by index.js.
  //      DO NOT put your config.js changes on github, either.
  //twitter: {
  //  consumer_key: 1,
  //  consumer_secret: 1,
  //  token: 1,
  //  token_secret: 1
  //}
//}
);
var test = require('tape');

var fakeDataTalks = {
  "webhook": {
    "label": "talk proposal",
    "title": "Development environments using fig",
    "level": "Beginner",
    "language": "en",
    "speaker": {
      "twitter": "bcnjs",
      "name": "Jorge Dias",
      "portrait": ""
    },
    "description": "Soft Engineer for development and testing environments is going to talk about the research being done at Xing regarding the use of docker and will do a brief overview of working with fig and some custom tools to improve the workflow"
  },
  "event": {
    "date": "2015-01-21T19:00:00.000Z",
    "name": "BarcelonaJS",
    "twitter": "bcnjs",
    "venue": {
      "name": "Mobile World Centre",
      "address": "C/ Fontanella 2, 08002 Barcelona",
      "private": false
    },
    "url": "www.meetup.com",
    "talks": [
      {
        "title": "Serious text editing in the browser",
        "level": "Advanced",
        "language": "es",
        "speaker": {
          "twitter": "bcnjs",
          "name": "Marijn Haverbeke",
          "portrait": ""
        },
        "description": makeid() + "When an textarea do cut it anymore alternatives: full-featured text and code editors written in browser JavaScript. This talk is about CodeMirror, one such editor. It'll explore the intricacies of faking an editable control, the challenges of making it scale to hundreds of thousands of lines, and the integration of modern code editor"
      },
      {
        "title": "Development environments using fig",
        "level": "Beginner",
        "language": "en",
        "speaker": {
          "twitter": "bcnjs",
          "name": "Jorge Dias",
          "portrait": ""
        },
        "description": makeid() + "Software Engineer turned  responsible for development and testing environments is going to talk about the research being done at Xing regarding the use of docker and will do a brief overview of working with fig and some custom tools to improve the workflow."
      }
    ]
  }
};

var fakeDataJobs = {
  "webhook": {
    "label": "jobs",
    "title": "New cool Job",
    "company": "lolipop",
    "description": "We're looking for Ninjas, because Ninja just sounds cool."
  },
  "jobs": [
    {
      "title": "New cool Job",
      "company": makeid() + "lolipop",
      "description": "We're looking for Ninjas, because Ninja just sounds cool."
    },
    {
      "title": "New cool Job",
      "company": makeid() + "lolipop",
      "description": "We're looking for Ninjas, because Ninja just sounds cool."
    }
  ]
};

// NOTE: replace our module's send function with a mock.
//       It simply tests whether any data is provided.
//       If so, it invokes callback with a success
//       value, otherwise it invokes cb with error message.
giteventsTwitter.send = function (data, cb) {

  if (data === undefined) {
    console.log("send() received no tweet");

    return cb("no tweet created");
  }

//actual fn sends a tweet here
  console.log('\n' + data + '\n');

  return cb(null, "stub return");
};

test('post talks tweet works', function(t){
	t.plan(2)
	giteventsTwitter.init(fakeDataTalks, function(err, res){
		t.ok(res, 'we get a response from server');
	})
});

test('post jobs tweet works', function(t){
	t.plan(2)
	giteventsTwitter.init(fakeDataJobs, function(err, res){
		t.ok(res, 'we get a response from server for jobs');
	})
});

function makeid(){
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for( var i=0; i < 5; i++ )
	    text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}
