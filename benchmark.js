/*
 * benchmark.js - COMP2007 section 2.4 (execution cost)
 * Times validateForm on one valid and one invalid registration. Run: node benchmark.js
 */
'use strict';
var validateForm = require('./validator.js').validateForm;

var RUNS = 100000;
var good = { email: 'name@example.com', password: 'Abcdefg1', age: '25' };
var bad  = { email: 'not-an-email', password: 'abc', age: 'abc' };

function time(label, data) {
  var start = process.hrtime.bigint();
  for (var i = 0; i < RUNS; i++) { validateForm(data); }
  var ms = Number(process.hrtime.bigint() - start) / 1e6;
  console.log(label + ': ' + RUNS + ' calls in ' + ms.toFixed(1) + ' ms (' +
              (ms * 1000 / RUNS).toFixed(2) + ' microseconds per call)');
}

console.log('Node.js ' + process.version);
time('valid form  ', good);
time('invalid form', bad);
