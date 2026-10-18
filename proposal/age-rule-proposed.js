/*
 * proposal/age-rule-proposed.js - COMP2007 section 2.6
 * The age rule from validator.js rewritten to use the proposed Number.parseIntStrict.
 */
'use strict';
require('./parse-int-strict.js');   // installs Number.parseIntStrict (prototype)

// ---- FIGURE: age rule with the proposed built-in -----------------------------
var ageRuleProposed = {
  test: function (v) {
    try {
      var a = Number.parseIntStrict(v.trim());
      return a >= 18 && a <= 120;
    } catch (e) {
      if (e instanceof SyntaxError || e instanceof RangeError) { return false; }
      throw e;                      // any other error is a bug and must not be hidden
    }
  },
  message: 'Age must be a whole number from 18 to 120.'
};
// ---- END FIGURE --------------------------------------------------------------

module.exports = { ageRuleProposed: ageRuleProposed };
