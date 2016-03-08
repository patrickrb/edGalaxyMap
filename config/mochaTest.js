'use strict';

module.exports = {
  options: {
    reporter: 'spec',
    require: 'mocha.conf.js',
    timeout: 5000 // set default mocha spec timeout
  },
  unit: {
    src: ['<%= yeoman.server %>/**/*.spec.js']
  },
  integration: {
    src: ['<%= yeoman.server %>/**/*.integration.js']
  }
};
