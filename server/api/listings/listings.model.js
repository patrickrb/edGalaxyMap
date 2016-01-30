'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var listingsSchema = new Schema({
  id: { type: Number },
  station_id: { type: Number, ref: 'Station' },
  commodity_id : { type: Number, ref: 'Commodity'},
  supply : { type: Number},
  buy_price : { type: Number},
  sell_price : { type: Number},
  demand : { type: Number},
  collected_at : { type: Number},
  update_count: { type: Number}
});

module.exports = mongoose.model('listings', listingsSchema);
