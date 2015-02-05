gitevents-twitter
=====
Twitter module for gitevents [gitevents](https://github.com/GitEvents/gitevents)

## Introduction

This is pending to revisision or modification by the group depending on common needs:

gitevents-twitter is an [gitevents](https://github.com/GitEvents/gitevents) module that will:

* 1 tweet new coming talks
* 2 publish job offers
* 3 congrats the speaker and ,in case they exist, publish link to the talk slides.

this module will receive an object with some required params(all of this pending to possible future modifications):

1. `webhook {Object}`: right now with just one required parameter:
	* `label {String}`: could be "talk proposal" or "jobs"

if previous label is "talk proposal" next param will be:
2. `talks {Array}`: Array of objects with this required params by now:
	* `description {String}`: could be "talk proposal" or "jobs"

else if previous label is "jobs" will next param will be:
2. `jobs {Array}`: Array of objects with this required params:
	* 'company {String}`
	* 'description {String}`

## Basic usage

```js
giteventsTwitter.init(data, function(err, res){
	
})
```

## Test

```sh
node test
```

## LICENSE

MIT license, read [LICENSE file](https://raw.githubusercontent.com/ifraixedes/gitevents-mailer/master/LICENSE) for more information.


