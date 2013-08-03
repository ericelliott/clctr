'use strict';
var collection = require('../clctr.js'),
  test = require('tape');

test('.contains()', function (t) {
  var c = collection({name: 'test'});

  t.ok(c.contains('test'),
    'should return true if a the object contains the value.');

  t.end();
});

test('.hasOwn()', function (t) {
  var c = collection({name: 'test'});

  t.ok(c.hasOwn('name'),
    'should return true if the instance has the named property.');

  t.end();
});

test('.set()', function (t) {
  var c = collection({'name': 'old'});

  c.set({name: 'value'});

  t.ok(c.name, 'value',
    'should set property.');

  t.end();

});
