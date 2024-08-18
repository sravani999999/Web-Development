/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import qr from "qr-image";

import { input } from '@inquirer/prompts';

const answer = await input({ message: 'Enter your URL' });
   
 


import fs from 'fs';

const qr_svg = qr.image(answer, { type: 'png' });
qr_svg.pipe(fs.createWriteStream('i_love_qr.png'));

 
var svg_string = qr.imageSync('I love QR!', { type: 'png' });
fs.writeFile('message.txt', answer, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  }); 
    

