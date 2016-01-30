/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /listing              ->  index
 * POST    /listing              ->  create
 * GET     /listing/:id          ->  show
 * PUT     /listing/:id          ->  update
 * DELETE  /listing/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Listings = require('./listings.model');

// Get list of listing
exports.index = function(req, res) {
  Listings.find(function (err, listings) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(listings);
  });
};

// Get a single listing
exports.show = function(req, res) {
  Listings.findById(req.params.id, function (err, listing) {
    if(err) { return handleError(res, err); }
    if(!listing) { return res.status(404).send('Not Found'); }
    return res.json(listing);
  });
};

// Get a single listing
exports.listingsByStationId = function(req, res) {
  Listings.find({station_id: req.params.stationId})
  .populate('commodities')
  .exec(function(err, listings) {
    if(err) { return handleError(res, err); }
    if(!listings) { return res.status(404).send('Not Found'); }
    return res.json(listings);
  });
};

// Creates a new listing in the DB.
exports.create = function(req, res) {
  Listings.create(req.body, function(err, listing) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(listing);
  });
};

// Updates an existing listing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Listings.findById(req.params.id, function (err, listing) {
    if (err) { return handleError(res, err); }
    if(!listing) { return res.status(404).send('Not Found'); }
    var updated = _.merge(listing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(listing);
    });
  });
};

// Deletes a listing from the DB.
exports.destroy = function(req, res) {
  Listings.findById(req.params.id, function (err, listing) {
    if(err) { return handleError(res, err); }
    if(!listing) { return res.status(404).send('Not Found'); }
    listing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
