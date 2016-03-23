'use strict';

// Package all the html partials into a single javascript payload
module.exports = {
  options: {
    // This should be the name of your apps angular module
    module: 'edGalaxyMap',
    htmlmin: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    },
    usemin: 'app/app.js'
  },
  main: {
    cwd: '<%= yeoman.client %>',
    src: ['{app,components}/**/*.html'],
    dest: '.tmp/templates.js'
  },
  tmp: {
    cwd: '.tmp',
    src: ['{app,components}/**/*.html'],
    dest: '.tmp/tmp-templates.js'
  }
};
