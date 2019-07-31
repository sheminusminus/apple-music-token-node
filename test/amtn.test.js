const chai = require('chai');
const path = require('path');
const moment = require('moment');

const amtn = require('../index');
const config = require('./testData/config');

const { assert } = chai;

const { getToken, getTokenAsync } = amtn;

const mockCertFile = './testData/APNsAuthKey_6F44JJ9SDF_com.example.FakeApp_UB40ZXKCDZ.p8';

describe('apple music token node', () => {
  describe('sync api', () => {
    it('should exist', () => {
      assert.isFunction(getToken);
    });
  
    it('should return an object `{ token, expiresAt }` for valid params', () => {
      const validPath = path.resolve(__dirname, mockCertFile);
      const tokenData = getToken(validPath, config.testTeamId, config.testKeyId, 1);
      assert.isObject(tokenData);
      assert.isString(tokenData.token);
      assert.isNumber(tokenData.expiresAt);
    });
  
    it('if no `hoursValid` provided, should complete using 12h default', () => {
      const validPath = path.resolve(__dirname, mockCertFile);
      const { expiresAt } = getToken(validPath, config.testTeamId, config.testKeyId);
      const soon = moment().add(13, 'hours');
      const sooner = moment().add(11, 'hours');
      assert.isTrue(moment.unix(expiresAt).isSameOrBefore(soon, 'hour'));
      assert.isTrue(moment.unix(expiresAt).isSameOrAfter(sooner, 'hour'));
    });
  
    it('should throw an error if the certificate file does not exist', () => {
      const invalidPath = path.resolve(__dirname, 'sex_panther.p8');
      function throwing() {
        getToken(invalidPath, config.testTeamId, config.testKeyId, 1);
      }
      assert.throws(throwing);
    });
  });

  describe('async api', () => {
    it('should exist', () => {
      assert.isFunction(getTokenAsync);
    });

    it('should return a promise', () => {
      const validPath = path.resolve(__dirname, mockCertFile);
      const tokenDataPromise = getTokenAsync(validPath, config.testTeamId, config.testKeyId, 1);
      assert.instanceOf(tokenDataPromise, Promise, 'result is not a promise');
    });

    it('should resolve to an object `{ token, expiresAt }` for valid params', async () => {
      const validPath = path.resolve(__dirname, mockCertFile);
      const tokenData = await getTokenAsync(validPath, config.testTeamId, config.testKeyId, 1);
      assert.isObject(tokenData);
      assert.isString(tokenData.token);
      assert.isNumber(tokenData.expiresAt);
    });
  
    it('if no `hoursValid` provided, should complete using 12h default', async () => {
      const validPath = path.resolve(__dirname, mockCertFile);
      const { expiresAt } = await getTokenAsync(validPath, config.testTeamId, config.testKeyId);
      const soon = moment().add(13, 'hours');
      const sooner = moment().add(11, 'hours');
      assert.isTrue(moment.unix(expiresAt).isSameOrBefore(soon, 'hour'));
      assert.isTrue(moment.unix(expiresAt).isSameOrAfter(sooner, 'hour'));
    });
  
    it('should reject/throw if the certificate file does not exist', async () => {
      let err = null;
      let result = null;
      const invalidPath = path.resolve(__dirname, 'sex_panther.p8');
      try {
        result = await getTokenAsync(invalidPath, config.testTeamId, config.testKeyId, 1);
      } catch (e) {
        err = e;
      }
      assert.isNotNull(err);
      assert.isNull(result);
    });
  });
});
