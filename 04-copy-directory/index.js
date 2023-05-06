const fs = require('fs');
const path = require('path');

const srcFolder = path.join(__dirname, 'files');
const targetFolder = path.join(__dirname, 'files-copy');
console.log(srcFolder)
console.log(targetFolder)

function copyDirectory(srcFolder, destFolder) {
  fs.mkdir(destFolder, { recursive: true }, (err) => {
    if (err) throw err;

    fs.readdir(srcFolder, { withFileTypes: true }, (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        const srcPath = path.join(srcFolder, file.name);
        const destPath = path.join(destFolder, file.name);

        if(file.isDirectory()) {
          copyDirectory(srcPath, destPath);
        } else {
          const readStream = fs.createReadStream(srcPath);
          const writeStream = fs.createWriteStream(destPath);
          readStream.pipe(writeStream);
        }
      });
    });
  });
}


copyDirectory(srcFolder, targetFolder);