const amtn = require('../index');

module.exports = (filePath, teamId, keyId, hoursValid) => {
  try {
    return amtn(filePath.trim(), teamId.trim(), keyId.trim(), hoursValid);
  } catch (error) {
    console.log(error);
  }
};
