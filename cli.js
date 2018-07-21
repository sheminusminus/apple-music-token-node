const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');

const inquiry = require('./lib/inquiry');

const log = console.log;

clear();

const amtnAscii = figlet.textSync('amtn', { horizontalLayout: 'default', font: 'Swan' });
const amtnPretty = chalk.magenta.bold(amtnAscii);

log(amtnPretty);

const run = async () => {
  const teamId = await inquiry.askTeamId();
  const keyId = await inquiry.askKeyId();
  const filePath = await inquiry.askFilePath();
  const exp = await inquiry.askExpiration();
  log(teamId, keyId, filePath, exp);
};

run();
