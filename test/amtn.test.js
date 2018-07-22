const chai = require('chai');
const path = require('path');
const moment = require('moment');

const amtn = require('../index');
const InvalidCertPathError = require('../invalidCertPathError');
const config = require('./testData/config');

const { assert, expect } = chai;

const mockCertFile = './testData/APNsAuthKey_6F44JJ9SDF_com.example.FakeApp_UB40ZXKCDZ.p8';

describe('apple music token node', () => {
  it('should exist', () => {
    assert.isFunction(amtn);
  });

  it('should return an object `{ token, expiresAt }` for valid params', () => {
    const validPath = path.resolve(__dirname, mockCertFile);
    const tokenData = amtn(validPath, config.testTeamId, config.testKeyId, 1);
    assert.isObject(tokenData);
    assert.isString(tokenData.token);
    assert.isNumber(tokenData.expiresAt);
  });

  it('if no `hoursValid` provided, should complete using 12h default', () => {
    const validPath = path.resolve(__dirname, mockCertFile);
    const { expiresAt } = amtn(validPath, config.testTeamId, config.testKeyId);
    const soon = moment().add(13, 'hours');
    const sooner = moment().add(11, 'hours');
    assert.isTrue(moment.unix(expiresAt).isSameOrBefore(soon, 'hour'));
    assert.isTrue(moment.unix(expiresAt).isSameOrAfter(sooner, 'hour'));
  });

  it('should throw an error if the certificate file does not exist', () => {
    const invalidPath = path.resolve(__dirname, 'sex_panther.p8');
    function throwing() {
      amtn(invalidPath, config.testTeamId, config.testKeyId, 1);
    }
    assert.throws(throwing);
  });
});
