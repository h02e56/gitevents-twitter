var net = require('net');
var path = require('path');
var url =require('url');
var debug = require('debug')('Server');
var config = require('./config')


// server
var server = http.createServer(function(req, res){
	staticFiles.serve(req, res, function (err, data) {
	    if (err) {
            debug("> Error serving " + req.url + " - " + err.message);
            res.writeHead(err.status, err.headers);	            
            res.end();
        } else {
            debug("> " + req.url + " - " + data.message);            
        }
	 })	
}).listen(config.PORT);




