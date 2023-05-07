const fs = require ('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const distFolder = path.join(__dirname, 'project-dist');

const cssBundlePath = path.join(distFolder, 'bundle.css');

const mergedStyles = [];

fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const filePath = path.join(stylesFolder, file.name);

    if (file.isFile() && path.extname(file.name) === '.css') {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) throw err;
        
        mergedStyles.push(data);
      
        fs.writeFile(cssBundlePath, mergedStyles.join('\n'), (err) => {
          if (err) throw err;
        });
      });
    }
  });
});