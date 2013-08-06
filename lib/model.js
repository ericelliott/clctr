'use strict';
var modelMethods = require('mout/collection'),
  obj = require('mout/object'),
  stampit = require('stampit'),
  EventEmitter = require('events').EventEmitter,
  cuid = require('cuid'),

  convertMethods = obj.mixIn({}, modelMethods),

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
        this.emit('change', obj);

      } else {

        prev = attrs[name];
        attrs[name] = value;
        this.emit('change', {
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

  model = stampit().methods(proto).state({
    events: new EventEmitter()
  }).enclose(function () {
    var instance = this;
    instance.attrs = stampit.mixIn({
      id: cuid(),
      slug: cuid.slug()
    }, instance);
    obj.forOwn(instance, function (key) {
      delete instance[key];
    });
  });

module.exports = model;
