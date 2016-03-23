'use strict';

module.exports = {
  babel: {
    files: ['<%= yeoman.client %>/{app,components}/**/!(*.spec|*.mock).js'],
    tasks: ['newer:babel:client']
  },
  injectJS: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/!(*.spec|*.mock).js',
      '!<%= yeoman.client %>/app/app.js'
    ],
    tasks: ['injector:scripts']
  },
  injectCss: {
    files: ['<%= yeoman.client %>/{app,components}/**/*.css'],
    tasks: ['injector:css']
  },
  mochaTest: {
    files: ['<%= yeoman.server %>/**/*.{spec,integration}.js'],
    tasks: ['env:test', 'mochaTest']
  },
  jsTest: {
    files: ['<%= yeoman.client %>/{app,components}/**/*.{spec,mock}.js'],
    tasks: ['newer:jshint:all', 'wiredep:test', 'karma']
  },
  injectSass: {
    files: ['<%= yeoman.client %>/{app,components}/**/*.{scss,sass}'],
    tasks: ['injector:sass']
  },
  sass: {
    files: ['<%= yeoman.client %>/{app,components}/**/*.{scss,sass}'],
    tasks: ['sass', 'postcss']
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  livereload: {
    files: [
      '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.{css,html}',
      '{.tmp,<%= yeoman.client %>}/{app,components}/**/!(*.spec|*.mock).js',
      '<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
    ],
    options: {
      livereload: true
    }
  },
  express: {
    files: ['<%= yeoman.server %>/**/*.{js,json}'],
    tasks: ['express:dev', 'wait'],
    options: {
      livereload: true,
      spawn: false //Without this option specified express won't be reloaded
    }
  },
  bower: {
    files: ['bower.json'],
    tasks: ['wiredep']
  }
};
