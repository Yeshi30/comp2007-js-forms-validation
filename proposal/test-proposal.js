/*
 * proposal/test-proposal.js - COMP2007 section 2.6
 * Checks the prototype of Number.parseIntStrict and prints the comparison used in the report.
 * Run from the project folder with:  node proposal/test-proposal.js
 */
'use strict';
var assert = require('assert');
var parseIntStrict = require('./parse-int-strict.js').parseIntStrict;
var ageRuleProposed = require('./age-rule-proposed.js').ageRuleProposed;
var parseAge = require('../validator.js').parseAge;

function outcome(fn) {
  try { return String(fn()); } catch (e) { return e.name; }
}

// ---- the comparison table in the report ---------------------------------------
var inputs = ['25', '25abc', '', ' ', '2.5', '1e3', '0x1F', '99999999999999999999'];
console.log('input'.padEnd(24) + 'parseInt(x, 10)'.padEnd(24) + 'Number(x)'.padEnd(24) + 'parseIntStrict(x)');
inputs.forEach(function (s) {
  console.log(JSON.stringify(s).padEnd(24) + String(parseInt(s, 10)).padEnd(24) +
              String(Number(s)).padEnd(24) + outcome(function () { return parseIntStrict(s); }));
});

// ---- behaviour of the proposed function ---------------------------------------
assert.strictEqual(parseIntStrict('25'), 25);
assert.strictEqual(parseIntStrict('-7'), -7);
assert.strictEqual(parseIntStrict('007'), 7);
assert.ok(Object.is(parseIntStrict('-0'), 0));
['25abc', '', ' ', ' 25', '25 ', '2.5', '1e3', '0x1F', '+5', '--5', '5-'].forEach(function (s) {
  assert.throws(function () { parseIntStrict(s); }, SyntaxError, JSON.stringify(s));
});
assert.throws(function () { parseIntStrict('99999999999999999999'); }, RangeError);
[25, [25], null, undefined, {}].forEach(function (x) {
  assert.throws(function () { parseIntStrict(x); }, TypeError);
});
assert.strictEqual(typeof Number.parseIntStrict, 'function');   // installed by the prototype

// ---- the rewritten age rule agrees with the age rule in validator.js ----------
var samples = ['', ' ', 'abc', '25', ' 25 ', '17', '18', '120', '121', '25abc', '2.5',
               '-5', '1e3', '0x1F', '99999999999999999999'];
samples.forEach(function (s) {
  var a = parseAge(s);
  var current = a >= 18 && a <= 120;
  assert.strictEqual(ageRuleProposed.test(s), current, 'differs for ' + JSON.stringify(s));
});

console.log('\nAll proposal tests passed');
