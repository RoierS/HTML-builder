const path = require('path');
const fs = require('fs');

const secretfolderPath = path.resolve(__dirname, 'secret-folder');

fs.readdir(secretfolderPath, { withFileTypes: true }, (err, files) => {
  if (err) console.error(err);

  files.forEach((file) => {
    const filePath = path.resolve(secretfolderPath, `${file.name}`);
    fs.stat(filePath, (err, stats) => {
      if (err) console.error(err);
      
      if (file.isFile()) {
        const fileNameExt = file.name;
        const fileName = fileNameExt.slice(0, `${fileNameExt.indexOf('.')}`)
        const  fileExt = path.extname(file.name).slice(1);
        const size = (stats.size / 1024).toFixed(3)
        console.log(`${fileName} - ${fileExt} - ${size}kb`)
      }
    });
  });
});


