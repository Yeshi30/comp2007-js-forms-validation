# JavaScript registration form validation (COMP2007 assignment)

Client-side validation of a registration form (email, password, age). Each invalid
field gets its own error message. The JavaScript version has no dependencies. A
TypeScript version is included for the comparison in the report (section 2.5).

## Folder layout
- `validator.js`           validation logic (prototypes, closures, try/catch, events)
- `index.html`             the form; open it directly in a web browser
- `test.js`                automated tests for the validator
- `examples/characteristics.js`  one example for each of the nine language characteristics (section 2.3)
- `test-examples.js`       checks that every characteristic example behaves as described
- `benchmark.js`           times the validator (execution cost, section 2.4)
- `typescript/`            the same validator written in TypeScript (sections 2.3 and 2.5)
- `proposal/`              prototype of the proposed `Number.parseIntStrict` and its tests (section 2.6)

## Dependencies
- JavaScript parts: a modern web browser, and Node.js 14 or later for the test scripts.
  No `npm install` is needed.
- TypeScript part only: Node.js 14 or later and npm (it installs TypeScript 5 and @types/node).

## How to run
From this folder:

    node test.js              # validator tests -> "All tests passed"
    node test-examples.js     # characteristic examples -> "All characteristic examples verified"
    node examples/characteristics.js   # prints the results of each example
    node benchmark.js         # prints how long 100,000 validations take (varies by computer)
    node proposal/test-proposal.js   # section 2.6 prototype -> "All proposal tests passed"

Open `index.html` in a browser, submit with invalid values and read the messages.

TypeScript (from the `typescript` folder):

    npm install
    npm run build             # compiles validator.ts (no output means success)
    npm test                  # compiles and runs the TypeScript tests
    npm run bad-calls         # shows the compile-time errors TypeScript reports (expected to fail)
    npm run checks-2-3        # six more compile-time errors used in section 2.3 (expected to fail)

## Validation rules
- Email: required, must look like `name@domain.tld`
- Password: required, 8+ characters, one uppercase letter, one digit
- Age: required, whole number from 18 to 120

Repository: https://github.com/Yeshi30/comp2007-js-forms-validation