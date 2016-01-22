'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var systemsSchema = new Schema({
  systemId: { type: Number, required: true },
  name: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  z: { type: Number, required: true },
  faction: { type: String },
  population: { type: Number, required: true },
  government: { type: String },
  allegiance: { type: String },
  state: { type: String },
  security: { type: String },
  primary_economy: { type: String },
  power: { type: String },
  power_state: { type: String },
  needs_permit: { type: Boolean },
  updated_at: { type: Date },
  simbad_ref: { type: String }
});

module.exports = mongoose.model('systems', systemsSchema);
