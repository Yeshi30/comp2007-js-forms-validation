/*
 * proposal/parse-int-strict.js - COMP2007 section 2.6
 * A working prototype of the proposed Number.parseIntStrict(string).
 * A real language change would be written into the specification and built into the
 * engine; this file only shows that the behaviour can be defined and tested today.
 *
 * Specification sketch (in the style of ECMA-262):
 *   Number.parseIntStrict(string)
 *   1. If Type(string) is not String, throw a TypeError exception.
 *   2. If string is not one or more decimal digits 0-9, optionally preceded by one
 *      "-" and with nothing else before, inside or after them, throw a SyntaxError
 *      exception. (No spaces, "+", ".", exponent, hexadecimal prefix or separators.)
 *   3. Let n be the Number value of string.
 *   4. If n is outside the range -(2^53 - 1) to 2^53 - 1, throw a RangeError
 *      exception, because the value could not be stored exactly.
 *   5. Return n (the value -0 is returned as +0).
 */
'use strict';

// ---- FIGURE: proposed built-in (prototype) ------------------------------------
function parseIntStrict(string) {
  if (typeof string !== 'string') {
    throw new TypeError('parseIntStrict needs a string');
  }
  if (!/^-?[0-9]+$/.test(string)) {
    throw new SyntaxError('"' + string + '" is not a whole number');
  }
  var n = Number(string);
  if (n > Number.MAX_SAFE_INTEGER || n < -Number.MAX_SAFE_INTEGER) {
    throw new RangeError('"' + string + '" cannot be stored exactly');
  }
  return n === 0 ? 0 : n;
}
// ---- END FIGURE --------------------------------------------------------------

if (typeof Number.parseIntStrict !== 'function') {
  Object.defineProperty(Number, 'parseIntStrict', {
    value: parseIntStrict, writable: true, configurable: true, enumerable: false
  });
}

module.exports = { parseIntStrict: parseIntStrict };
