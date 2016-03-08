'use strict';

// Performs rewrites based on rev and the useminPrepare configuration
module.exports = {
  html: ['<%= yeoman.dist %>/client/{,!(bower_components)/**/}*.html'],
  css: ['<%= yeoman.dist %>/client/!(bower_components){,*/}*.css'],
  js: ['<%= yeoman.dist %>/client/!(bower_components){,*/}*.js'],
  options: {
    assetsDirs: [
      '<%= yeoman.dist %>/client',
      '<%= yeoman.dist %>/client/assets/images'
    ],
    // This is so we update image references in our ng-templates
    patterns: {
      js: [
        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
      ]
    }
  }
};
