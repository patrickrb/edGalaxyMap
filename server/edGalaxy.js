var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var app = express();

var rootDir = path.normalize(__dirname + '/..');


// Connect to database
mongoose.connect('mongodb://localhost/edGalaxy', {db:{safe: true}});
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);


    app.use(require('connect-livereload')());
    app.use(express.static(path.join(rootDir, 'app')));
    app.set('appPath', path.join(rootDir, 'app'));



require('./routes')(app);

var server = require('http').createServer(app);

server.listen(3000, 'localhost', function () {
  console.log('Express server listening on 3000');
});
