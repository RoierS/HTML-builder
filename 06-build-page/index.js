const fs = require ('fs');
const path = require('path');

const componentsFolder = path.join(__dirname, 'components');
const stylesSrcFolder = path.join(__dirname, 'styles');
const stylesDist = path.join(__dirname, 'project-dist', 'style.css');
const assetsSrcFolder = path.join(__dirname, 'assets');
const assetsDistFolder = path.join(__dirname, 'project-dist', 'assets');
const template = path.join(__dirname, 'template.html');
const distFolder = path.join(__dirname, 'project-dist');

fs.mkdir(distFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.mkdir(assetsDistFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.writeFile(stylesDist, '', (err) => {
  if (err) throw err;
});

function copyDirectory(srcFolder, destFolder) {
  fs.mkdir(destFolder, { recursive: true }, (err) => {
    if (err) throw err;
    
    fs.readdir(destFolder, { withFileTypes: true }, (err, destFiles) => {
      if (err) throw err;

      destFiles.forEach(file => {
        const destPath = path.join(destFolder, file.name);

        if (file.isFile()) {
          fs.unlink(destPath, (err) => {
            if(err) throw err;
          });
        }
      });

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
  });
}

copyDirectory(assetsSrcFolder, assetsDistFolder);

