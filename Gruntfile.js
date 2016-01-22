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
            'open:dev',
            'watch'
        ]);
    });

    grunt.registerTask('default', [ 'serve']);
};
