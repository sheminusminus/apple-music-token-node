const inquirer = require('inquirer');
const chalk = require('chalk');

const files = require('./files');

let confirmFile = null;

const askTeamId = () => {
  const questions = [
    {
      name: 'teamId',
      type: 'input',
      message: chalk.black.bold.bgWhite('Your Apple Team ID:'),
      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return chalk.bold('You can find your Apple Team ID by logging into the Apple Developer site and navigating to developer.apple.com/account/#/membership');
        }
      },
    },
  ];
  return inquirer.prompt(questions);
};

const askKeyId = () => {
  const questions = [
    {
      name: 'keyId',
      type: 'password',
      message: chalk.black.bold.bgWhite('Your music key ID:'),
      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return chalk.bold('You can find your key ID by logging into the Apple Developer site and navigating to developer.apple.com/account/ios/authkey/');
        }
      },
    },
  ];
  return inquirer.prompt(questions);
};

const askFilePath = () => {
  const questions = [
    {
      name: 'filePath',
      type: 'input',
      message: chalk.black.bold.bgWhite('The full path to your .p8 file, or drag and drop the file into this terminal:'),
      validate: (value) => {
        let fp = value.trim();
        let fileExists = files.fileExists(fp);

        if (fileExists) return true;

        if (!fp.endsWith('.p8')) {
          fp = `${fp}.p8`
          fileExists = files.fileExists(fp);
          if (fileExists) {
            confirmFile = fp;
          }
        }
        if (!fileExists) {
          const tryPath = files.resolveUsingCwd(fp);
          fileExists = files.fileExists(tryPath);
          if (fileExists) confirmFile = tryPath;
        }

        return fileExists || chalk.bold('You must enter a valid key file path.');
      },
    },
  ];
  return inquirer.prompt(questions);
};

const askConfirmFile = () => {
  const questions = [
    {
      name: 'confirm',
      type: 'confirm',
      when: confirmFile !== null,
      message: chalk.black.bold.bgWhite(`Should I use this similar file path? ${confirmFile}`),
    },
  ];
  return inquirer.prompt(questions);
};

const askExpiration = () => {
  const questions = [
    {
      name: 'expires',
      type: 'input',
      message: chalk.black.bold.bgWhite('Enter the number of hours until this token should expire (default is 12h):'),
      default: 12,
      validate: (value) => {
        if (!value || !Number.isNaN(parseFloat(value))) {
          return true;
        } else {
          return chalk.bold('You must enter a valid number, or leave blank to use the default.');
        }
      },
    },
  ];
  return inquirer.prompt(questions);
};

const getAltPath = () => confirmFile;

module.exports = {
  askTeamId,
  askKeyId,
  askFilePath,
  askConfirmFile,
  askExpiration,
  getAltPath,
};
