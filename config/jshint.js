'use strict';

// Make sure code styles are up to par and there are no obvious mistakes
module.exports = {
  options: {
    jshintrc: '<%= yeoman.client %>/.jshintrc',
    reporter: require('jshint-stylish')
  },
  server: {
    options: {
      jshintrc: '<%= yeoman.server %>/.jshintrc'
    },
    src: ['<%= yeoman.server %>/**/!(*.spec|*.integration).js']
  },
  serverTest: {
    options: {
      jshintrc: '<%= yeoman.server %>/.jshintrc-spec'
    },
    src: ['<%= yeoman.server %>/**/*.{spec,integration}.js']
  },
  all: ['<%= yeoman.client %>/{app,components}/**/!(*.spec|*.mock).js'],
  test: {
    src: ['<%= yeoman.client %>/{app,components}/**/*.{spec,mock}.js']
  }
};
