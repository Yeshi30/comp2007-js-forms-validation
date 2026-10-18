/*
 * examples/characteristics.js - COMP2007 section 2.3
 * One small, runnable example for each of the nine characteristics. Every example
 * uses the registration-form task (email, password, age). The code between the
 * "FIGURE" markers is the code shown in the report. test-examples.js checks it.
 */
'use strict';
var v = require('../validator.js');
var FieldValidator = v.FieldValidator;
var parseAge = v.parseAge;
var validateForm = v.validateForm;

var out = {};

// ---- FIGURE: simplicity (feature multiplicity) -------------------------------
var emptyAge = '';                  // an empty age field
var simplicityResults = [
  emptyAge === '',                  // true
  !emptyAge,                        // true
  emptyAge.length === 0,            // true
  emptyAge.trim() === '',           // true
  emptyAge == 0                     // true: '' is converted to the number 0
];
// ---- END FIGURE --------------------------------------------------------------
out.simplicity = { results: simplicityResults,
                   spaceEqualsZero: ' ' == 0,         // true as well
                   zeroStringStrict: ('0' === 0) };   // false with strict equality

// ---- FIGURE: orthogonality (one operator, two meanings) ----------------------
var ageField = '25';                // the value of a form field is a string
var plusResult = ageField + 1;      // '251' (+ joins strings)
var minusResult = ageField - 1;     // 24    (- converts to numbers)
// ---- END FIGURE --------------------------------------------------------------
out.orthogonality = { plusResult: plusResult, minusResult: minusResult };

// ---- FIGURE: data types (NaN is a number) -------------------------------------
var badAge = parseAge('abc');       // NaN signals an invalid age
var badAgeType = typeof badAge;     // 'number'
var strictCompare = badAge === NaN; // false: NaN is not equal to anything
var correctTest = isNaN(badAge);    // true: the test that works
// ---- END FIGURE --------------------------------------------------------------
out.dataTypes = { badAgeType: badAgeType, strictCompare: strictCompare,
                  correctTest: correctTest, rangeCheckStillRejects: !(badAge >= 18 && badAge <= 120) };

// ---- FIGURE: syntax design (return and line breaks) ---------------------------
function failure() {
  return
  { valid: false };
}
var failureResult = failure();      // undefined, not { valid: false }
// ---- END FIGURE --------------------------------------------------------------

// ---- FIGURE: syntax design (var and loops) ------------------------------------
var names = ['email', 'password', 'age'];
var handlers = [];
for (var i = 0; i < names.length; i++) {
  handlers.push(function () { return names[i]; });
}
var firstName = handlers[0]();      // undefined: i is 3 when the handler runs
// ---- END FIGURE --------------------------------------------------------------
out.syntaxDesign = { failureResult: failureResult, firstName: firstName };

// ---- FIGURE: abstraction (nothing is private) ---------------------------------
var never = [{ test: function () { return false; }, message: 'Never valid.' }];
var fv = new FieldValidator('age', never);
var before = fv.validate('abc').valid;   // false
fv.rules = [];                           // nothing stops outside code replacing the rules
var after = fv.validate('abc').valid;    // true
// ---- END FIGURE --------------------------------------------------------------
out.abstraction = { before: before, after: after };

// ---- expressivity uses the password rules in validator.js (no new code) -------
out.expressivity = {
  strong: validateForm({ email: 'a@b.com', password: 'Abcdefg1', age: '25' })[1].valid,
  weakMessage: validateForm({ email: 'a@b.com', password: 'abcdefg1', age: '25' })[1].message
};

// ---- FIGURE: type checking (a wrong type is accepted) -------------------------
var data = { email: 'a@b.com', password: 'Abcdefg1', age: [25] };  // an array, not a string
var ageAccepted = validateForm(data)[2].valid;  // true: String([25]) is '25'
// ---- END FIGURE --------------------------------------------------------------
out.typeChecking = { ageAccepted: ageAccepted };

// ---- FIGURE: exception handling (silent failures) -----------------------------
var silent = Number('abc');         // NaN, no exception is thrown
var ignoredText = parseInt('25abc', 10);  // 25, the trailing text is ignored
// ---- END FIGURE --------------------------------------------------------------
out.exceptionHandling = { silentIsNaN: isNaN(silent), ignoredText: ignoredText };

// ---- FIGURE: restricted aliasing (shared rules array) -------------------------
var rules = [{ test: function (v) { return v !== ''; }, message: 'Required.' }];
var password = new FieldValidator('password', rules);
var confirmation = new FieldValidator('confirmation', rules);
password.rules.push({ test: function (v) { return v.length >= 8; }, message: 'Too short.' });
var confirmLength = confirmation.rules.length; // 2: confirmation changed as well
// ---- END FIGURE --------------------------------------------------------------
out.aliasing = { confirmLength: confirmLength, sameArray: password.rules === confirmation.rules };

module.exports = out;
if (require.main === module) { console.log(JSON.stringify(out, null, 2)); }
