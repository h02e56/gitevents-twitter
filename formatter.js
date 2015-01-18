module.exports = function(talk, cb){
	
	if(!talk) return cb('should provide a talk', null)
	if(typeof talk !== 'object') cb('wrong talk format ', null)	
	
	var description = '';

	
	description += '@'+ talk.speaker.twitter;
	description += ' | TITLE: '+ talk.title;
	description += ' | LANGUAGE: ' + talk.language.toUpperCase() + ' | LEVEL: ' + talk.level.toUpperCase();
	// description += talk.description;


    cb(null, description)
}