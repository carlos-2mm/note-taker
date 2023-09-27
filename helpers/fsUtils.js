const fs = require('fs');
const util = require('util');

// Convert callback-based readFile to a promise-based function
const readFromFile = util.promisify(fs.readFile);

// Write content to a specified file destination
const writeToFile = (destination, content) => {
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
    err ? console.error(err) : console.info(`Data written to ${destination}`);
  });
};

// Read a file, parse its JSON content, and append new content to it
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (!err) {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    } else {
      console.error(err);
    }
  });
};

// Read a file, parse its JSON content, and delete a note by ID
const readAndDelete = (id, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (!err) {
      const parsedData = JSON.parse(data);
      const newData = parsedData.filter((note) => note.id !== id);
      writeToFile(file, newData);
    } else {
      console.error(err);
    }
  });
}

// Export utility functions
module.exports = { readFromFile, readAndDelete, readAndAppend };
