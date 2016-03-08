'use strict';

// Use nodemon to run server in debug mode with an initial breakpoint
module.exports = {
  debug: {
    script: '<%= yeoman.server %>',
    options: {
      nodeArgs: ['--debug-brk'],
      env: {
        PORT: process.env.PORT || 9000
      },
      callback: function (nodemon) {
        nodemon.on('log', function (event) {
          console.log(event.colour);
        });

        // opens browser on initial server start
        nodemon.on('config:update', function () {
          setTimeout(function () {
            require('open')('http://localhost:8080/debug?port=5858');
          }, 500);
        });
      }
    }
  }
};
