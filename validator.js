/*
 * validator.js - client-side registration form validation (COMP2007 assignment).
 * Plain JavaScript, no dependencies. Runs in a browser and in Node.js.
 */
'use strict';

// ---- 1. Prototype-based objects (no classes) -------------------------------
// FieldValidator is a constructor function; its methods live on the prototype
// and are shared by every instance via the prototype chain.
function FieldValidator(name, rules) {
  this.name = name;
  this.rules = rules; // array of { test: fn(value) -> boolean, message: string }
}

FieldValidator.prototype.validate = function (value) {
  for (var i = 0; i < this.rules.length; i++) {
    if (!this.rules[i].test(value)) {
      return { field: this.name, valid: false, message: this.rules[i].message };
    }
  }
  return { field: this.name, valid: true, message: '' };
};

// ---- 2. Closures: rule factories remember their configuration --------------
function minLength(n) {
  return { test: function (v) { return v.length >= n; },
           message: 'Must be at least ' + n + ' characters.' };
}
function matches(regex, message) {
  return { test: function (v) { return regex.test(v); }, message: message };
}
function required(message) {
  return { test: function (v) { return v.trim() !== ''; }, message: message };
}

// ---- 3. Age needs an explicit conversion step ------------------------------
// Form fields always arrive as strings. JavaScript will silently coerce them,
// e.g. Number('') === 0 and Number('  ') === 0, so "empty" would pass as age 0.
// We therefore check for emptiness first, then convert explicitly.
function parseAge(value) {
  var text = String(value).trim();
  if (text === '' || !/^\d+$/.test(text)) { return NaN; }
  return Number(text);
}
var ageRule = {
  test: function (v) { var a = parseAge(v); return a >= 18 && a <= 120; },
  message: 'Age must be a whole number from 18 to 120.'
};

// ---- 4. Exception handling for unexpected input ----------------------------
// Missing/odd values (null, undefined, numbers) would otherwise throw or be
// coerced silently, so each field is normalised inside try/catch.
function toText(value) {
  if (value === null || value === undefined) { return ''; }
  return String(value);
}

var validators = {
  email: new FieldValidator('email', [
    required('Email is required.'),
    matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address, e.g. name@example.com.')
  ]),
  password: new FieldValidator('password', [
    required('Password is required.'),
    minLength(8),
    matches(/[A-Z]/, 'Password needs at least one uppercase letter.'),
    matches(/[0-9]/, 'Password needs at least one digit.')
  ]),
  age: new FieldValidator('age', [
    required('Age is required.'),
    ageRule
  ])
};

// Returns one result per field: { field, valid, message }
function validateForm(data) {
  var results = [];
  var names = Object.keys(validators);
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    try {
      results.push(validators[name].validate(toText(data[name])));
    } catch (err) {
      results.push({ field: name, valid: false, message: 'Could not check this field.' });
    }
  }
  return results;
}

// ---- 5. Event handling (browser only) --------------------------------------
function attachToForm(form) {
  form.addEventListener('submit', function (event) {
    var data = {
      email: form.elements.email.value,
      password: form.elements.password.value,
      age: form.elements.age.value
    };
    var results = validateForm(data);
    var allValid = true;
    results.forEach(function (r) {
      var el = form.querySelector('[data-error-for="' + r.field + '"]');
      if (el) { el.textContent = r.message; }
      if (!r.valid) { allValid = false; }
    });
    if (!allValid) { event.preventDefault(); }
  });
}

var api = { FieldValidator: FieldValidator, validateForm: validateForm,
            parseAge: parseAge, attachToForm: attachToForm };
if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
else { window.FormValidator = api; }
