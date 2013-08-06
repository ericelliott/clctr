'use strict';
var 
  collection = require('./lib/collection.js'),
  model = require('./lib/model.js');

// Export the collection stamp, and add model
collection.model = model;

module.exports = collection;
