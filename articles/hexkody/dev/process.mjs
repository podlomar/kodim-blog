import { promises as fs } from 'fs';

const filepath = '/home/podlomar/crazy-16.bmp';

const buffer = await fs.readFile(filepath);
const bytes = Array.from(buffer);

let line = '  0: ';
for (let i = 0; i < bytes.length; i++) {
  const binary = bytes[i].toString(2).padStart(8, '0');
  line += binary;
  
  if (i % 8 === 7) {
    console.log(line);
    line = `${(i+1).toString().padStart(3, ' ')}: `;
  } else {
    line += ' ';
  }
}

console.log(line);

// let line = '0000: ';
// for (let i = 0; i < bytes.length; i++) {
//   const hex = bytes[i].toString(16).padStart(2, '0');
//   line += hex;
  
//   if (i % 16 === 15) {
//     console.log(line);
//     line = `${(i + 1).toString(16).padStart(4, '0')}: `;
//   } else {
//     line += ' ';
//   }
// }

// console.log(line);
