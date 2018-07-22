class InvalidCertPathError extends Error {
  constructor(data, ...args) {
    super(...args);
    this.data = data;
    Error.captureStackTrace(this, InvalidCertPathError);
  }
}

module.exports = InvalidCertPathError;
