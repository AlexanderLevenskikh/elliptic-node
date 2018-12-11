import * as fs from 'fs';
import { handler } from './handler';

const input = require('./input.json');

const result = handler(input);

fs.writeFile('output.txt', result, (err) => {
    if (err) throw err;
});


