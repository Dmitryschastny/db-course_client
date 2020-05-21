const fs = require('fs');
const dir = require('node-dir');
const parsePath = require('parse-filepath');

const ROOT_DIR = './src';
const OUTPUT = './code.txt';

const EXCLUDE_DIR = ['styles'];

const fileContents = [];
dir.readFiles(
  ROOT_DIR,
  {
    excludeDir: EXCLUDE_DIR,
  },
  (err, content, next) => {
    if (err) throw err;

    fileContents.push(content);
    next();
  },
  (err, files) => {
    if (err) throw err;

    files.forEach((f, i) => {
      fileContents[i] = `${f}\n\n${fileContents[i]}\n\n\n`;
    });

    const result = fileContents.join('');

    fs.writeFileSync(OUTPUT, result);
  }
);
