const fs = require('fs');
const path = require('path');

module.exports = {
  resolveUsingCwd: (fp) => path.resolve(path.basename(process.cwd()), fp),
  fileExists: (filePath) => {
    try {
      return fs.lstatSync(filePath).isFile();
    } catch (err) {
      return false;
    }
  }
};
