/*
 * typescript/validator.ts - the same registration validation written in TypeScript
 * (COMP2007 section 2.5). TypeScript adds a static type checker to JavaScript.
 */

export interface Rule {
  test: (value: string) => boolean;
  message: string;
}

export interface FieldResult {
  field: string;
  valid: boolean;
  message: string;
}

// A class instead of a constructor function + prototype, with a private field.
export class FieldValidator {
  private readonly rules: Rule[];
  constructor(public readonly name: string, rules: Rule[]) {
    this.rules = rules;
  }
  validate(value: string): FieldResult {
    for (const rule of this.rules) {
      if (!rule.test(value)) {
        return { field: this.name, valid: false, message: rule.message };
      }
    }
    return { field: this.name, valid: true, message: '' };
  }
}

const required = (message: string): Rule =>
  ({ test: v => v.trim() !== '', message });
const minLength = (n: number): Rule =>
  ({ test: v => v.length >= n, message: `Must be at least ${n} characters.` });
const matches = (re: RegExp, message: string): Rule =>
  ({ test: v => re.test(v), message });

export function parseAge(value: string): number {
  const text = value.trim();
  if (text === '' || !/^\d+$/.test(text)) { return NaN; }
  return Number(text);
}

const validators: FieldValidator[] = [
  new FieldValidator('email', [
    required('Email is required.'),
    matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address, e.g. name@example.com.')
  ]),
  new FieldValidator('password', [
    required('Password is required.'),
    minLength(8),
    matches(/[A-Z]/, 'Password needs at least one uppercase letter.'),
    matches(/[0-9]/, 'Password needs at least one digit.')
  ]),
  new FieldValidator('age', [
    required('Age is required.'),
    { test: v => { const a = parseAge(v); return a >= 18 && a <= 120; },
      message: 'Age must be a whole number from 18 to 120.' }
  ])
];

export interface FormData {
  email: string;
  password: string;
  age: string;
}

export function validateForm(data: FormData): FieldResult[] {
  return validators.map(fv => fv.validate(data[fv.name as keyof FormData]));
}
