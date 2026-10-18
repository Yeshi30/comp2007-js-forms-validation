// Each line below is a mistake that JavaScript accepts silently but the TypeScript
// compiler rejects before the program runs. Used as evidence in section 2.5.
import { validateForm, FieldValidator } from './validator';

validateForm({ email: 'a@b.com', password: 'Abcdefg1', age: [25] });      // error: array is not a string
validateForm({ email: 'a@b.com', password: 'Abcdefg1' });                 // error: age is missing
const fv = new FieldValidator('demo', []);
fv.rules = [];                                                            // error: 'rules' is private
