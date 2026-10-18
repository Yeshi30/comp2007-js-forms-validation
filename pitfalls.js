// Demonstrates JavaScript dynamic-typing behaviours referred to in the report (section 2.3).
console.log("'5' + 3      =", '5' + 3);          // '53'  (+ concatenates)
console.log("'5' * 3      =", '5' * 3);          // 15    (* coerces to number)
console.log("Number('')   =", Number(''));       // 0     (empty string silently becomes 0)
console.log("Number('abc')=", Number('abc'));    // NaN   (no exception raised)
console.log("typeof null  =", typeof null);      // 'object'
console.log("[] + {}      =", [] + {});          // '[object Object]'
function leak() { undeclared = 1; }               // sloppy mode: creates a global
leak(); console.log('implicit global created:', typeof undeclared);
