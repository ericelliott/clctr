'use strict';
var model = require('../clctr.js').model,
  test = require('tape');

test('.contains()', function (t) {
  var myModel = model({name: 'test'});

  t.ok(myModel.contains('test'),
    'should return true if a the object contains the value.');

  t.end();
});

test('.get()', function (t) {
  var myModel = model({name: 'test'});

  t.ok(myModel.get('id'),
    'should return the value of the given named property.');

  t.end();
});

test('.set()', function (t) {
  var myModel = model({'name': 'old'});

  myModel.set({name: 'value'});

  t.ok(myModel.name, 'value',
    'should set property.');

  t.end();

});
