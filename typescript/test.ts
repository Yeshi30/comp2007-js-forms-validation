import { validateForm } from './validator';
import * as assert from 'assert';

const good = validateForm({ email: 'a@b.com', password: 'Abcdefg1', age: '25' });
assert(good.every(r => r.valid));
assert.strictEqual(validateForm({ email: 'bad', password: 'Abcdefg1', age: '25' })[0].valid, false);
assert.strictEqual(validateForm({ email: 'a@b.com', password: 'Abcdefg1', age: '' })[2].valid, false);
console.log('TypeScript tests passed');
