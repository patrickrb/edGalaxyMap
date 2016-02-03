/**
 * Gruntfile.js
 *
 * Copyright (c) 2012 quickcue
 */


module.exports = function(grunt) {
    // Load dev dependencies
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take for build time optimizations
    require('time-grunt')(grunt);
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Configure the app path
    var base = 'app';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // The actual grunt server settings
        express: {
           options: {
             // Override defaults here
           },
           dev: {
             options: {
               port:3000,
               script: 'server/edGalaxy.js',
               livereload: true
             }
           }
         },
         ngAnnotate: {
            dev: {
              files: { 'public/edGalaxyAnnotate.min.js': ['app/scripts/app.js', 'app/scripts/factories/**/*.js', 'app/scripts/services/**/*.js', 'app/scripts/controllers/main.js', 'app/scripts/directives/**/*.js']
              }
            }
         },
         babel: {
             options: {
                 sourceMap: true,
                 presets: ['es2015']
             },
             dist: {
                 files: {
                     'public/edGalaxy.babel.js': 'public/edGalaxyAnnotate.min.js'
                 }
             }
         },
         uglify: {
            dev: {
                files: {
                    'public/edGalaxy.min.js': ['public/edGalaxy.babel.js']
                },
                options: {
                    mangle: true
                }
            }
         },
         wiredep: {
          task: {
            // Point to the files that should be updated when
            // you run `grunt wiredep`
            src: [
              'app/index.html',   // .html support...
            ],
            options: {
              // See wiredep's configuration documentation for the options
              // you may pass:

              // https://github.com/taptapship/wiredep#configuration
            },
            overrides:{
              'three.js':{
                  main: ["./build/three.min.js", "./examples/js/controls/TrackballControls.js", "./examples/js/renderers/Projector.js"]
              },
              'bootstrap':{
                  main: ["dist/js/bootstrap.min.js", "dist/css/bootstrap.min.css"]
              },
              'bootswatch': {
                  main: ["cyborg/bootstrap.css"]
              },
              'font-awesome':{
                  main: ["./css/font-awesome.min.css"]
              }
            }
          }
        },
        injector: {
          options: {
            transform: function(filePath) {
                filePath = filePath.replace('app/', '');
                return '<script src="' + filePath + '"></script>';
            },
          },
          local_dependencies: {
            files: {
                'app/index.html': [
                    [   'app/lib/**/*.js',
                        'app/scripts/app.js',
                        'app/scripts/controllers/**/*.js',
                        'app/scripts/factories/**/*.js',
                        'app/scripts/services/**/*.js',
                        'app/scripts/directives/**/*.js'
                    ]
                ]
            }
          }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [ base + '/scripts/**/*.js' ]
        },
        watch: {
            express: {
              files:  [ 'server/**/*.js' ],
              tasks:  [ 'express:dev' ],
              options: {
                spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
              }
            },
            js: {
                files: [
                    '<%= jshint.all %>'
                ],
                tasks: ['jshint'],
                options: {
                  livereload: true
                }
            },
            json: {
                files: [
                    '{package,bower}.json'
                ],
                tasks: ['jsonlint']
            }
        },
        open: {
         dev: {
           // Gets the port from the connect configuration
           path: 'http://localhost:<%= express.dev.options.port%>'
         }
       }
    });

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'express',
            'wiredep',
            'injector',
            'open:dev',
            'watch'
        ]);
    });

    grunt.registerTask('build', function () {
        grunt.task.run([
            'wiredep',
            'ngAnnotate',
            'babel',
            'uglify'
        ]);
    });

    grunt.registerTask('default', [ 'serve']);
};
