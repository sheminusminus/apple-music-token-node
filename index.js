const jwt = require('jsonwebtoken');
const fs = require('fs');
const moment = require('moment');

const InvalidCertPathError = require('./invalidCertPathError');

/**
 * @function getToken - Generates a developer token for use with the Apple Music API
 * @param {string} certPath - Absolute path to your .p8 private key file
 * @param {string} teamId - Developer team id
 * @param {string} keyId - Music Key id
 * @param {string} hoursValid - Hours until the key should expire
 * @returns {{token: string, expiresAt: timestamp, expiresIn: seconds}} -
 * ES256 encoded JWT token, time of expiration (in seconds), and also the seconds
 * remaining until expiration occurs.
 *
 * (`expiresIn` is sort of a lazy solution on my part, but is included to avoid
 * requiring anyone to deal with side-effects from date conversions between server
 * and client code.)
 */
const getToken = (certPath, teamId, keyId, hoursValid = 12) => {
  if (!fs.lstatSync(certPath).isFile()) {
    throw new InvalidCertPathError(
      { certPath },
      'Cert path provided to apple-music-token-node is not a valid file path',
    );
  }

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
    expiresIn: expiration - now,
  };
};

module.exports = getToken;
