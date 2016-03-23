'use strict';

var _ = require('lodash');
var Commodities = require('./commodities.model');

// Get list of commodity
exports.index = function(req, res) {
  Commodities.find(function (err, commodities) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(commodities);
  });
};

// Get a single commodity
exports.show = function(req, res) {
  Commodities.findById(req.params.id, function (err, commodity) {
    if(err) { return handleError(res, err); }
    if(!commodity) { return res.status(404).send('Not Found'); }
    return res.json(commodity);
  });
};

// Creates a new commodity in the DB.
exports.create = function(req, res) {
  Commodities.create(req.body, function(err, commodity) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(commodity);
  });
};

// Updates an existing commodity in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Commodities.findById(req.params.id, function (err, commodity) {
    if (err) { return handleError(res, err); }
    if(!commodity) { return res.status(404).send('Not Found'); }
    var updated = _.merge(commodity, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(commodity);
    });
  });
};

// Deletes a commodity from the DB.
exports.destroy = function(req, res) {
  Commodities.findById(req.params.id, function (err, commodity) {
    if(err) { return handleError(res, err); }
    if(!commodity) { return res.status(404).send('Not Found'); }
    commodity.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
