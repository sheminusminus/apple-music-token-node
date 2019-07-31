const amtn = require('../index');

const { getToken } = amtn;

module.exports = (filePath, teamId, keyId, hoursValid) => {
  try {
    return getToken(filePath.trim(), teamId.trim(), keyId.trim(), hoursValid);
  } catch (error) {
    console.log(error);
  }
};
