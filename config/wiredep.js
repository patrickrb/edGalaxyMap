'use strict';

// Automatically inject Bower components into the app and karma.conf.js
module.exports = {
  options: {
    exclude: [
      '/json3/',
      '/es5-shim/',
      /font-awesome\.css/
    ]
  },
  client: {
    src: '<%= yeoman.client %>/index.html',
    ignorePath: '<%= yeoman.client %>/',
    overrides:{
      'three.js':{
          main: ["build/three.min.js", "examples/js/controls/OrbitControls.js", "examples/js/renderers/Projector.js"]
      },
      'bootstrap':{
          main: ["dist/js/bootstrap.min.js", "dist/css/bootstrap.css"]
      },
      'bootswatch': {
          main: ["cyborg/bootstrap.css"]
      },
      'font-awesome':{
          main: ["css/font-awesome.min.css"]
      }
    }
  },
  test: {
    src: './karma.conf.js',
    devDependencies: true
  }
}
