'use strict';

// The following *-min tasks produce minified files in the dist folder
module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= yeoman.client %>/assets/images',
      src: '*/*.{png,jpg,jpeg,gif,svg}',
      dest: '<%= yeoman.dist %>/client/assets/images'
    }]
  }
};
