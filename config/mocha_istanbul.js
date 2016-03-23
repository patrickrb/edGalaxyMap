'use strict';

module.exports = {
  unit: {
    options: {
      excludes: ['**/*.{spec,mock,integration}.js'],
      reporter: 'spec',
      require: ['mocha.conf.js'],
      mask: '**/*.spec.js',
      coverageFolder: 'coverage/server/unit'
    },
    src: '<%= yeoman.server %>'
  },
  integration: {
    options: {
      excludes: ['**/*.{spec,mock,integration}.js'],
      reporter: 'spec',
      require: ['mocha.conf.js'],
      mask: '**/*.integration.js',
      coverageFolder: 'coverage/server/integration'
    },
    src: '<%= yeoman.server %>'
  }
};
