const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');

const inquiry = require('./lib/inquiry');
const gen = require('./lib/gen');

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
  console.log(tokenData);
};

run();
