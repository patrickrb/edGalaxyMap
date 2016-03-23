'use strict';

module.exports = {
  options: {
    config: '.jscs.json'
  },
  main: {
    files: {
      src: [
        '<%= yeoman.client %>/app/**/*.js',
        '<%= yeoman.server %>/**/*.js'
      ]
    }
  }
};
