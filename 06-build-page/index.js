const fs = require ('fs');
const path = require('path');

const components = path.join(__dirname, components);
const stylesSrc = path.join(__dirname, 'styles');
const stylesDist = path.join(__dirname, 'project-dist', 'style.css');
const assetsSrc = path.join(__dirname, 'project-dist', 'assets');
const assetsDist = path.join(__dirname, 'assets');
const template = path.join(__dirname, 'template.html');
const dist = path.join(__dirname, 'project-dist');
