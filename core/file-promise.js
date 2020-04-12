const { readFile, writeFile } = require('fs');

exports.get = (source_path, encoding) =>
  new Promise((resolve, reject) => {
    readFile(source_path, encoding, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer);
    });
  });
exports.upsert = (path, content, encoding) =>
  new Promise((resolve, reject) => {
    writeFile(path, content, encoding, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
