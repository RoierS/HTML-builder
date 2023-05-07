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
fs.writeFile(stylesDist, (err) => {
  if (err) throw err;
});


