/**
 * Main application routes
 */

'use strict';

// var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/systems', require('./api/systems'));
  app.use('/api/stations', require('./api/stations'));
  app.use('/api/commodities', require('./api/commodities'));



  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
