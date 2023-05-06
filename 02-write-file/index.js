const { error } = require('console');
const fs = require('fs');
const path = require('path');
const { stdout, stdin } = process;

const filePath = path.resolve(__dirname, 'text.txt');

const textStream = fs.createWriteStream(filePath);

stdout.write(`Hi! Write some text here...\n(for exit type 'exit' or press 'Ctrl+C')\n`);
stdin.on('data', data => {

if ( data.toString().trim() === 'exit') {
  stdout.write('Goodbye!\n');
  process.exit();
}
textStream.write(data);
})

process.on('SIGINT', () => {
  stdout.write('Bye!\n');
  process.exit();
})



