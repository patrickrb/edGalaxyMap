'use strict';

// Empties folders to start fresh
module.exports = {
  options: {

  },
  // Inject application script files into index.html (doesn't include bower)
  scripts: {
    options: {
      transform: function(filePath) {
        filePath = filePath.replace('/client/', '');
        filePath = filePath.replace('/.tmp/', '');
        return '<script src="' + filePath + '"></script>';
      },
      starttag: '<!-- injector:js -->',
      endtag: '<!-- endinjector -->'
    },
    files: {
      '<%= yeoman.client %>/index.html': [
           [
             '.tmp/{app,components}/**/!(*.spec|*.mock).js',
             '!{.tmp,<%= yeoman.client %>}/app/app.js'
           ]
        ]
    }
  },

  // Inject component scss into app.scss
  sass: {
    options: {
      transform: function(filePath) {
        filePath = filePath.replace('/client/app/', '');
        filePath = filePath.replace('/client/components/', '../components/');
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector'
    },
    files: {
      '<%= yeoman.client %>/app/app.scss': [
        '<%= yeoman.client %>/{app,components}/**/*.{scss,sass}',
        '!<%= yeoman.client %>/app/app.{scss,sass}'
      ]
    }
  },

  // Inject component css into index.html
  css: {
    options: {
      transform: function(filePath) {
        filePath = filePath.replace('/client/', '');
        filePath = filePath.replace('/.tmp/', '');
        return '<link rel="stylesheet" href="' + filePath + '">';
      },
      starttag: '<!-- injector:css -->',
      endtag: '<!-- endinjector -->'
    },
    files: {
      '<%= yeoman.client %>/index.html': [
        '<%= yeoman.client %>/{app,components}/**/*.css'
      ]
    }
  }
};
