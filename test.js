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
//       If so, it invokes callback with the data,
//       otherwise it invokes callback with an error message.
giteventsTwitter.send = function (data, cb) {
  if (data === undefined) {
    console.error("send() received no tweet");

    return cb("no tweet created");
  }

//actual fn sends a tweet here

  return cb(null, data);
};

test('post talks tweet works', function(t){
  t.plan(2);

  giteventsTwitter.init(fakeDataTalks, function (err, res) {
    if (err) {
      return console.error(err);
    }

    t.ok(res, 'we get a response from server');
  });
});

test('post jobs tweet works', function(t){
  t.plan(2);

	giteventsTwitter.init(fakeDataJobs, function(err, res){
    if (err) {
      return console.error(err);
    }

    t.ok(res, 'we get a response from server for jobs');
	})
});

// Creates array of sent tweets then checks array elements
// for correctness and array for length. Either tweet
// may arrive first, so this is handled. Removes 5 character
// id from tweet before checks.
test('talk tweets match expected results', function (t) {
  var tempTweet = "",
    tweetAsArray = [],
    tweetsSent = [],
    tweet1 = "New talk: www.meetup.com When an textarea do cut it anymore alternatives: full-featured text and code editors written in bro...",
    tweet2 = "New talk: www.meetup.com Software Engineer turned  responsible for development and testing environments is going to talk abo...";

  t.plan(2);

  giteventsTwitter.init(fakeDataTalks, function (err, res) {
    if (err) {
      return console.error(err);
    }

    // remove 5 char id from tweet before adding to array
    tweetAsArray = res.split('');
    tweetAsArray.splice(25, 5);
    res = tweetAsArray.join('');

    tweetsSent.push(res);

    // wait for both tweets to be sent (i.e. stored in the array)
    if (tweetsSent.length === 2) {
      // may need to swap tweets around before check
      if (tweetsSent[0] !== tweet1) {
        tempTweet = tweetsSent[0];
        tweetsSent[0] = tweetsSent[1];
        tweetsSent[1] = tempTweet;
      }

      t.equal(tweetsSent[0], tweet1, 'tweet 1 matches expected result');
      t.equal(tweetsSent[1], tweet2, 'tweet 2 matches expected result');
    }
    else if (tweetsSent.length > 2) {
      t.fail('too many tweets sent');
    }
  });
});

//  This test calls init(), providing the optional second parameter
// as "custom", which builds the tweet using a custom format.
// Otherwise, the test is the same as the 'talk tweets match expected results'
// test directly above this one.
test('custom talk tweets match expected results', function (t) {
  var tweetsSent = [],
    tweet1 = "LNUG talk - @bcnjs - Serious text editing in the browser",
    tweet2 = "LNUG talk - @bcnjs - Development environments using fig";

  t.plan(2);

  giteventsTwitter.init(fakeDataTalks, "custom", function (err, res) {
    if (err) {
      return console.error(err);
    }
    tweetsSent.push(res);
    // wait for both tweets to be sent (i.e. stored in the array)
    if (tweetsSent.length === 2) {
      // may need to swap tweets around before check
      if (tweetsSent[0] !== tweet1) {
        tempTweet = tweetsSent[0];
        tweetsSent[0] = tweetsSent[1];
        tweetsSent[1] = tempTweet;
      }

      t.equal(tweetsSent[0], tweet1, 'tweet 1 matches expected result');
      t.equal(tweetsSent[1], tweet2, 'tweet 2 matches expected result');
    }
    else if (tweetsSent.length > 2) {
      t.fail('too many tweets sent');
    }
  });
});

function makeid(){
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for( var i=0; i < 5; i++ )
	    text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}
