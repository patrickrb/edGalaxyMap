'use strict';

// Compiles ES6 to JavaScript using Babel
module.exports = {
  options: {
    sourceMap: true
  },
  client: {
    files: [{
      expand: true,
      cwd: '<%= yeoman.client %>',
      src: ['{app,components}/**/!(*.spec).js'],
      dest: '.tmp'
    }]
  },
  server: {
    options: {
    },
    files: [{
      expand: true,
      cwd: '<%= yeoman.server %>',
      src: ['**/*.{js,json}'],
      dest: '<%= yeoman.dist %>/<%= yeoman.server %>'
    }]
  }
};
