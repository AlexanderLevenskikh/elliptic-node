import * as fs from 'fs';
import { handler } from './handler';


fs.readFile('./input.json', (err, data) => {
    if (err) throw err;
    const input = JSON.parse(data.toString());
    const result = handler(input);

    fs.writeFile('output.txt', result, (err) => {
        if (err) throw err;
    });
});




