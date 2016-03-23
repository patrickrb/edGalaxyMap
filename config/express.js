'use strict';

module.exports = {
  options: {
    port: process.env.PORT || 9000
  },
  dev: {
    options: {
      script: '<%= yeoman.server %>',
      debug: true
    }
  },
  prod: {
    options: {
      script: '<%= yeoman.dist %>/<%= yeoman.server %>'
    }
  }
};
