'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var systemsSchema = new Schema({
  fileName: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true }
});

module.exports = mongoose.model('systems', systemsSchema);
