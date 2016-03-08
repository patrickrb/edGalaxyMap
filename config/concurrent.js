'use strict';

// Empties folders to start fresh
module.exports = {
  server: [
    'newer:babel:client',
    'sass',
  ],
  test: [
    'newer:babel:client',
    'sass',
  ],
  debug: {
    tasks: [
      'nodemon',
      'node-inspector'
    ],
    options: {
      logConcurrentOutput: true
    }
  },
  dist: [
    'newer:babel:client',
    'sass',
    'imagemin'
  ]
};
