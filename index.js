const jwt = require('jsonwebtoken');
const fs = require('fs');
const moment = require('moment');

/**
 * @function getToken - Generates a developer token for use with the Apple Music API
 * @param {string} certPath - Absolute path to your .p8 private key file
 * @param {string} teamId - Developer team id
 * @param {string} keyId - Music Key id
 * @param {string} hoursValid - Hours until the key should expire
 * @returns {{token: string, expires: timestamp}} tokenData - ES256 encoded JWT token, and time of expiration
 */
const getToken = (certPath, teamId, keyId, hoursValid = 12) => {
  const alg = 'ES256';
  const cert = fs.readFileSync(certPath);

  const now = moment().unix();
  const expiration = moment().add(hoursValid, 'hours').unix();

  const header = {
    alg,
    kid: keyId,
  };

  const options = {
    algorithm: alg,
    header,
  };

  const payload = {
    iss: teamId,
    exp: expiration,
    iat: now,
  };

  const token = jwt.sign(payload, cert, options);

  return {
    token,
    expiresAt: expiration,
  };
};

module.exports = getToken;
