const fs = require ('fs');
const path = require('path');

const componentsFolder = path.join(__dirname, 'components');
const stylesSrcFolder = path.join(__dirname, 'styles');
const stylesDist = path.join(__dirname, 'project-dist', 'style.css');
const assetsSrcFolder = path.join(__dirname, 'assets');
const assetsDistFolder = path.join(__dirname, 'project-dist', 'assets');
const templateHtml = path.join(__dirname, 'template.html');
const distFolder = path.join(__dirname, 'project-dist');
const htmlDist = path.join(__dirname, 'project-dist', 'index.html');

// creating directories and css file

fs.mkdir(distFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.mkdir(assetsDistFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.writeFile(stylesDist, '', (err) => {
  if (err) throw err;
});

// copy assets to dist folder

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

//merge styles and drop result in dist folder

function mergeStyles(srcFolder, destPath) {
  const distStyles = [];
  
  fs.readdir(srcFolder, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
  
    files.forEach((file) => {
      const filePath = path.join(srcFolder, file.name);
  
      if (file.isFile() && path.extname(file.name) === '.css') {
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) throw err;
          
          distStyles.push(data);
        
          fs.writeFile(destPath, distStyles.join('\n'), (err) => {
            if (err) throw err;
          });
        });
      }
    });
  });
}

mergeStyles(stylesSrcFolder, stylesDist);

// replace template tags

function templateTagReplacement(components, template, resultFile) {
  let result = '';

  fs.readdir(components, {withFileTypes: true}, (err, files) => {
    if (err) throw err;

    fs.readFile(template, 'utf-8', (err, templateData) => {
      if (err) throw err;

      result = templateData;
    
      files.forEach(file => {
        if (file.isFile() && path.extname(file.name) === '.html') {
          fs.readFile(path.resolve(__dirname, 'components', `${file.name}`), 'utf-8', (err, data) => {
            if (err) throw err;
            
            let templateToChange = `{{${file.name.split('.')[0]}}}`;
            result = result.replace(templateToChange, data);
  
            fs.writeFile(resultFile, result, (err) => {
              if (err) throw err;
            });
          });
        }
      });
    });
    
  });
}

templateTagReplacement(componentsFolder, templateHtml, htmlDist);