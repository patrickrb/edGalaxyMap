'use strict';

var localConfig;
try {
  localConfig = require('./server/config/local.env');
} catch(e) {
  localConfig = {};
}

// sets some env variables
module.exports = {
  test: {
    NODE_ENV: 'test'
  },
  prod: {
    NODE_ENV: 'production'
  },
  all: localConfig
};
