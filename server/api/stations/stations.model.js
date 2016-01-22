'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var stationsSchema = new Schema({
  stationId: { type: Number, required: true },
  name: { type: String, required: true },
  system_id : { type: Number},
  max_landing_pad_size: { type: String },
  distance_to_star: { type: Number },
  faction: { type: String },
  government: { type: String },
  allegiance: { type: String },
  state: { type: String },
  type_id: { type: Number },
  type: { type: String },
  has_blackmarket: { type: Boolean },
  has_market: { type: Boolean },
  has_refuel: { type: Boolean },
  has_repair: { type: Boolean },
  has_rearm: { type: Boolean },
  has_outfitting: { type: Boolean },
  has_shipyard: { type: Boolean },
  has_market: { type: Boolean },
  updated_at: { type: Date },
  has_commodities: { type: String },
  import_commodities: [String],
  export_commodities: [String],
  prohibited_commodities: [String],
  economies: [String],
  updated_at: { type: Date },
  shipyard_updated_at: { type: Date },
  outfitting_updated_at: { type: Date },
  market_updated_at: { type: Date },
  is_planetary: { type: Boolean },
  selling_ships: [String],
  selling_modules: [String]
});

module.exports = mongoose.model('stations', stationsSchema);
