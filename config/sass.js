'use strict';

// Compiles Sass to CSS
module.exports = {
  server: {
    options: {
      compass: false
    },
    files: {
      '.tmp/app/app.css' : '<%= yeoman.client %>/app/app.scss'
    }
  }
};
