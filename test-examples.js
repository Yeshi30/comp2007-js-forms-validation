'use strict';
var assert = require('assert');
var o = require('./examples/characteristics.js');

// simplicity: five different ways to say "empty", and the loose one is true for '' and ' '
assert.deepStrictEqual(o.simplicity.results, [true, true, true, true, true]);
assert.strictEqual(o.simplicity.spaceEqualsZero, true);
assert.strictEqual(o.simplicity.zeroStringStrict, false);

// orthogonality: + joins, - converts
assert.strictEqual(o.orthogonality.plusResult, '251');
assert.strictEqual(o.orthogonality.minusResult, 24);

// data types: the invalid-age marker is a number that is not equal to itself
assert.strictEqual(o.dataTypes.badAgeType, 'number');
assert.strictEqual(o.dataTypes.strictCompare, false);
assert.strictEqual(o.dataTypes.correctTest, true);
assert.strictEqual(o.dataTypes.rangeCheckStillRejects, true);

// syntax design: return + newline, and var in a loop
assert.strictEqual(o.syntaxDesign.failureResult, undefined);
assert.strictEqual(o.syntaxDesign.firstName, undefined);

// abstraction: rules can be replaced from outside
assert.strictEqual(o.abstraction.before, false);
assert.strictEqual(o.abstraction.after, true);

// expressivity: three password rules are one list of regular expressions in validator.js
assert.strictEqual(o.expressivity.strong, true);
assert.strictEqual(o.expressivity.weakMessage, 'Password needs at least one uppercase letter.');

// type checking: an array is accepted as an age
assert.strictEqual(o.typeChecking.ageAccepted, true);

// exception handling: no exception for bad numbers, trailing text ignored
assert.strictEqual(o.exceptionHandling.silentIsNaN, true);
assert.strictEqual(o.exceptionHandling.ignoredText, 25);

// aliasing: both validators see the pushed rule
assert.strictEqual(o.aliasing.confirmLength, 2);
assert.strictEqual(o.aliasing.sameArray, true);

console.log('All characteristic examples verified');
