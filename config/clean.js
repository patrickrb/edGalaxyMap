'use strict';

// Empties folders to start fresh
module.exports = {
  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',
        '<%= yeoman.dist %>/!(.git*|.openshift|Procfile)**'
      ]
    }]
  },
  server: '.tmp'
};
