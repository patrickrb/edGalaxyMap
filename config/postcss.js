'use strict';

// Add vendor prefixed styles
module.exports = {
  options: {
    map: true,
    processors: [
      require('autoprefixer')({browsers: ['last 2 version']})
    ]
  },
  dist: {
    files: [{
      expand: true,
      cwd: '.tmp/',
      src: '{,*/}*.css',
      dest: '.tmp/'
    }]
  }
};
