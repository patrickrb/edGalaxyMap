var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require( 'body-parser' );
var User = require('./api/user/user.model');
var app = express();

var rootDir = path.normalize(__dirname + '/..');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


// Connect to database
mongoose.connect('mongodb://localhost/edGalaxy', {db:{safe: true}});
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);


    if(process.env.NODE_ENV === 'development'){
			app.use(require('connect-livereload')());
		}
    app.use(express.static(path.join(rootDir, 'app')));
    app.set('appPath', path.join(rootDir, 'app'));
		app.use( bodyParser.urlencoded({ extended: true }) );
		app.use(bodyParser.json());


require('./routes')(app);
require('../config/passport').setup(User);

var server = require('http').createServer(app);

server.listen(3000, 'localhost', function () {
  console.log('Express server listening on 3000');
});
