'use strict';
var assert = require('assert');
var v = require('./validator.js');
function one(data, field) { return v.validateForm(data).filter(function (r) { return r.field === field; })[0]; }

var good = { email: 'a@b.com', password: 'Abcdefg1', age: '25' };
assert(v.validateForm(good).every(function (r) { return r.valid; }));

assert.strictEqual(one({ email: '', password: 'Abcdefg1', age: '25' }, 'email').valid, false);
assert.strictEqual(one({ email: 'not-an-email', password: 'Abcdefg1', age: '25' }, 'email').valid, false);
assert.strictEqual(one({ email: 'a@b.com', password: 'short1A', age: '25' }, 'password').valid, false);
assert.strictEqual(one({ email: 'a@b.com', password: 'alllowercase1', age: '25' }, 'password').valid, false);
assert.strictEqual(one({ email: 'a@b.com', password: 'NoDigitsHere', age: '25' }, 'password').valid, false);

['', '   ', 'abc', '17', '121', '25.5', '-3', '1e1'].forEach(function (a) {
  assert.strictEqual(one({ email: 'a@b.com', password: 'Abcdefg1', age: a }, 'age').valid, false, 'age ' + JSON.stringify(a));
});
['18', '120', ' 30 '].forEach(function (a) {
  assert.strictEqual(one({ email: 'a@b.com', password: 'Abcdefg1', age: a }, 'age').valid, true, 'age ' + a);
});

// odd inputs must not throw
assert.doesNotThrow(function () { v.validateForm({}); });
assert.doesNotThrow(function () { v.validateForm({ email: null, password: undefined, age: 25 }); });
assert.strictEqual(one({ email: 'a@b.com', password: 'Abcdefg1', age: 25 }, 'age').valid, true); // number accepted via String()

console.log('All tests passed');
