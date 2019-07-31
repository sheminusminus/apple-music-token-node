const jwt = require('jsonwebtoken');
const fs = require('fs');
const moment = require('moment');

const InvalidCertPathError = require('./invalidCertPathError');

const getResult = (cert, teamId, keyId, hoursValid) => {
  const alg = 'ES256';
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
  try {
    if (!fs.lstatSync(certPath).isFile()) {
      throw new InvalidCertPathError(
        { certPath },
        'Cert path provided to apple-music-token-node is not a valid file path',
      );
    }
  } catch (err) {
    throw err;
  }

  const cert = fs.readFileSync(certPath);

  return getResult(cert, teamId, keyId, hoursValid);
};

/**
 * @function getTokenAsync - (Async) Generates a developer token for use with the Apple Music API
 * @param {string} certPath - Absolute path to your .p8 private key file
 * @param {string} teamId - Developer team id
 * @param {string} keyId - Music Key id
 * @param {string} hoursValid - Hours until the key should expire
 * @returns {Promise} -
 * Resolves to `{token: string, expiresAt: timestamp, expiresIn: seconds}` (ES256 encoded JWT token,
 * time of expiration (in seconds), and also the seconds remaining until expiration occurs).
 */
const getTokenAsync = (certPath, teamId, keyId, hoursValid = 12) => {
  return new Promise((resolve, reject) => {
    fs.lstat(certPath, (err, stats) => {
      if (err) {
        return reject(err);
      }

      if (!stats.isFile()) {
        return reject(new InvalidCertPathError(
          { certPath },
          'Cert path provided to apple-music-token-node is not a valid file path',
        ));
      }

      fs.readFile(certPath, (err, cert) => {
        if (err) {
          return reject(err);
        }

        const result = getResult(cert, teamId, keyId, hoursValid);

        return resolve(result);
      });
    });
  });
};

module.exports.getToken = getToken;
module.exports.getTokenAsync = getTokenAsync;
