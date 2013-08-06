'use strict';
var collectionMethods = require('mout/array'),
  obj = require('mout/object'),
  stampit = require('stampit'),
  EventEmitter = require('events').EventEmitter,

  model = require('./model.js'),

  // This is here so we can get selective later.
  convertMethods = obj.mixIn({}, collectionMethods, {
    add: function add() {},
    remove: function remove() {}
  }),

  nativeMethods = obj.map(convertMethods, function (method) {

    return function () {
      var args = [].slice.call(arguments);
      args.unshift(this);
      return method.apply(this.attrs, args);
    };

  }),

  proto = obj.mixIn({}, nativeMethods, {
    on: function on() {
      var events = this.events;
      events.on.apply(events, arguments);
    },

    emit: function emit() {
      var events = this.events;
      events.emit.apply(events, arguments);
    }
  }),

  collection = stampit().methods(proto).state({
    models: [],
    events: new EventEmitter()
  });

module.exports = collection;
