#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');

const inquiry = require('./inquiry');
const gen = require('./gen');

const log = console.log;

clear();

const amtnAscii = figlet.textSync('amtn <3', { horizontalLayout: 'default', font: 'Swan' });
const amtnPretty = chalk.magenta.bold(amtnAscii);

log(amtnPretty);

const run = async () => {
  let altPath = null;
  const team = await inquiry.askTeamId();
  const key = await inquiry.askKeyId();
  const fp = await inquiry.askFilePath();
  const confirm = await inquiry.askConfirmFile();
  const time = await inquiry.askExpiration();
  if (confirm) altPath = inquiry.getAltPath();
  const tokenData = gen(altPath || fp.filePath, team.teamId, key.keyId, time.expires)
  log(tokenData);
};

run();
