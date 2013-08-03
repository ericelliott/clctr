'use strict';
var collection = require('mout/collection'),
  obj = require('mout/object'),
  stampit = require('stampit'),
  EventEmitter = require('events').EventEmitter,

  convertMethods = obj.mixIn({}, collection, {
    get: obj.get,
    hasOwn: obj.hasOwn
  }),

  nativeMethods = obj.map(convertMethods, function (method) {

    return function () {
      var args = [].slice.call(arguments);
      args.unshift(this);
      return method.apply(this.attrs, args);
    };

  }),

  proto = obj.mixIn({}, nativeMethods, {
    set: function set(name, value) {
      var obj, prev, attrs = this.attrs;

      if (typeof name === 'object') {

        stampit.mixIn(attrs, obj);
        this.emit('set-collection', obj);

      } else {

        prev = attrs[name];
        attrs[name] = value;
        this.emit('set', {
          name: name,
          value: value,
          previousValue: prev
        });

      }

      return this;
    },

    get: function get(name) {
      return this.attrs[name];
    },

    on: function on() {
      var events = this.events;
      events.on.apply(events, arguments);
    },
    emit: function emit() {
      var events = this.events;
      events.emit.apply(events, arguments);
    }
  }),

  clctr = stampit().methods(proto).state({
    attrs: {},
    events: new EventEmitter()
  });

module.exports = clctr;
