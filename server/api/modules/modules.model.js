'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var modulesSchema = new Schema({
  id: { type: Number, required: true },
  group_id : { type: Number},
  class : { type: Number},
  rating: { type: String },
  price : { type: Number},
  weapon_mode: { type: String },
  missile_type: { type: String },
  name: { type: String },
  belongs_to: { type: Number },
  power: { type: Number },
  ship: { type: String },
  group: { id: Number, category_id: Number, name: String, category: String }
});

module.exports = mongoose.model('modules', modulesSchema);
