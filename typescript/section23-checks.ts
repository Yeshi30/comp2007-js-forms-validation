// Mistakes that JavaScript accepts silently but TypeScript's checker reports (strict mode).
// Used as evidence in section 2.3. Run with: npm run checks-2-3
import { Rule } from './validator';

function isEmptyAge(age: string): boolean {
  return age == 0;                 // string compared with number
}

function ageNextYear(age: string): number {
  return age - 1;                  // arithmetic on a form value that is still a string
}

function isBadAge(age: number): boolean {
  return age === NaN;              // NaN is never equal to anything
}

function makeResult(): { valid: boolean } {
  return
  { valid: true };                 // 'return' ends at the line break
}

function addRule(rules: readonly Rule[], extra: Rule): void {
  rules.push(extra);               // shared array must not be changed here
}

try {
  JSON.parse('{bad json');
} catch (e) {
  console.log(e.message);          // 'e' is not known to be an Error
}
