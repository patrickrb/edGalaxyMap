'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var commoditiesSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category_id : { type: Number},
  average_price : { type: Number},
  is_rare: { type: Boolean },
  category: { id: Number, name: String }
});

module.exports = mongoose.model('commodities', commoditiesSchema);
