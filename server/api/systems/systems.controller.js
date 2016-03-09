'use strict';

var _ = require('lodash');
var Systems = require('./systems.model');

// Get list of system
exports.index = function(req, res) {
  Systems.find(function (err, systems) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(systems);
  });
};

// Get a single system
exports.show = function(req, res) {
  Systems.findById(req.params.id, function (err, system) {
    if(err) { return handleError(res, err); }
    if(!system) { return res.status(404).send('Not Found'); }
    return res.json(system);
  });
};


// Creates a new system in the DB.
exports.create = function(req, res) {
  Systems.create(req.body, function(err, system) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(system);
  });
};

// Updates an existing system in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Systems.findById(req.params.id, function (err, system) {
    if (err) { return handleError(res, err); }
    if(!system) { return res.status(404).send('Not Found'); }
    var updated = _.merge(system, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(system);
    });
  });
};

// Deletes a system from the DB.
exports.destroy = function(req, res) {
  Systems.findById(req.params.id, function (err, system) {
    if(err) { return handleError(res, err); }
    if(!system) { return res.status(404).send('Not Found'); }
    system.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
