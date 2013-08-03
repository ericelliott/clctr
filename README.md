clctr
=====

Event emitting collections with iterators (like Backbone.Collection).

Warning: Developer preview release. Lots of broken stuff, I'm sure.


# Events

```js
var co = require('./clctr.js');
var c = co();

c.on('set', function () { console.log([].slice.call(arguments)); });

c.set('bar', 'baz');
// [ { name: 'bar', value: 'baz', previousValue: undefined } ]
```


## contains(list, value):Boolean

Checks if collection contains value.

```js
contains({a: 1, b: 2, c: 'bar'}, 2); // true
contains([1, 2, 3], 'foo');  // false
```

## every(list, callback, [thisObj]):Boolean

Tests whether all values in the collection pass the test implemented by the provided callback.

```js
var obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 'string'
};
 
every(obj, isNumber); // false
```


## filter(list, callback, [thisObj]):Object

Filter collection properties.


## find(list, callback, [thisObj]):*

Loops through all the values in the collection and returns the first one that passes a truth test (callback).

Important: loop order over objects properties isn't guaranteed to be the same on all environments.

```js
find({a: 'foo', b: 12}, isString); // 'foo'
find(['foo', 12], isNumber); // 12
```

## forEach(list, callback, [thisObj])

Loop through all values of the collection.

## map(list, callback, [thisObj]):Object

Returns a new collection where the properties values are the result of calling the callback for each property in the original collection.

## max(list, [iterator]):*

Returns maximum value inside collection or use a custom iterator to define how items should be compared.


```js
max({a: 100, b: 2, c: 1, d: 3, e: 200}); // 200
max(['foo', 'lorem', 'amet'], function(val){
    return val.length;
}); // 'lorem'
```

## min(list, [iterator]):* 

Returns minimum value inside collection or use a custom iterator to define how items should be compared.

```js
min([10, 2, 7]); // 2
min({a: 'foo', b: 'lorem', c: 'amet'}, function(val){
    return val.length;
}); // 'foo'
```

## pluck(list, propName):Array

Extract a list of property values.

```
var users = [
    {
        name : 'John',
        age : 21
    },
    {
        name : 'Jane',
        age : 27
    }
];
 
pluck(users, 'name'); // ["John", "Jane"]
pluck(users, 'age'); // [21, 27]
 
users = {
    first: {
        name : 'John',
        age : 21
    },
    second: {
        name : 'Mary',
        age : 25
    }
};
 
pluck(users, 'name'); // ['John', 'Mary']
```

## reduce(list, callback, initial, [thisObj]):* 

Apply a function against an accumulator and each value in the collection as to reduce it to a single value.

```js
var obj = {a: 1, b: 2, c: 3, d: 4};
 
function sum(prev, cur, key, list) {
    return prev + cur;
}
 
reduce(obj, sum); // 10
```

## reject(obj, callback, thisObj):Object

Returns a new object containing all properties where callback returns true, similar to Array/reject. It does not use properties from the object's prototype. Opposite of filter().


```js
var obj = {a: 1, b: 2, c: 3, d: 4, e: 5};
reject(obj, function(x) { return (x % 2) !== 0; }); // {b: 2, d: 4}
```

## size(list):Number

Returns the number of values in the collection.

```js
var obj = {
    foo : 1,
    bar : 2,
    lorem : 3
};
size(obj);     // 3
size([1,2,3]); // 3
size(null);    // 0
```

## some(list, callback, [thisObj]):Boolean

Tests whether any values in the collection pass the test implemented by the provided callback.

```js
var obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 'string'
};
 
some(obj, isNumber);      // true
some(obj, isString);      // true
```

