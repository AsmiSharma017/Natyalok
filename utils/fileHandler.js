const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/shows.json');

// Read file
function readShows() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

// Write file
function writeShows(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readShows, writeShows };
