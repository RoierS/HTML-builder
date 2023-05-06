const { error } = require('console');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

  const stream = fs.createReadStream(filePath, 'utf-8');
  
  let res = '';
  
  stream.on('data', chank => res += chank);
  stream.on('end', () => console.log(res));
  stream.on('error', error => console.log('Error', error.message));
