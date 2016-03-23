'use strict';

// Inject component css into index.html
module.exports = {
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
};
