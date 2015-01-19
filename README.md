gitevents-twitter
=====
Twitter module for gitevents (https://github.com/h02e56/gitevents-twitter.git)

# Introduction

This is pendding to revisision or modification by the group depending on common needs:

gitevents-twitter is an gitevents module that will be used to publish on twitter new coming talks, new job offers and also congrats the speaker and ,in case they exist, publish link to the talk slides

this module will receive an object like <a href="https://github.com/h02e56/gitevents-twitter/blob/master/sample_data.js"></a>
# Basic usage

```
...
var config = {github: {key: 'MY_WEBHOOK_KEY'}};
var webhook = require('./index')(config);
var data = {};

webhook.process(data, function(body, err) {
  if (err) {
    res.status(err).json({msg: 'Unauthorized'}).end();
  } else {
    res.send(body);
  }
});
...
