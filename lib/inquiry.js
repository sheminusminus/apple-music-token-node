const inquirer = require('inquirer');

const files = require('./files');

module.exports = {
  askTeamId: () => {
    const questions = [
      {
        name: 'teamId',
        type: 'input',
        message: 'Enter your Apple Team ID:',
        validate: (value) => {
          if (value.length) {
            return true;
          } else {
            return 'You can find your Apple Team Id by logging into developer.apple.com, or in the General settings of your project in Xcode.';
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
  askKeyId: () => {
    const questions = [
      {
        name: 'keyId',
        type: 'input',
        message: 'Enter your key ID:',
        validate: (value) => {
          if (value.length) {
            return true;
          } else {
            return 'Your key id by logging into the Apple Developer site and navigating to developer.apple.com/account/ios/authkey/';
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
  askFilePath: () => {
    const questions = [
      {
        name: 'filePath',
        type: 'input',
        message: 'Enter the full path to your .p8 file, or drag and drop it into this terminal:',
        validate: (value) => {
          if (value.trim().endsWith('.p8')) {
            return true;
          } else {
            return 'You must enter a valid .p8 key file.';
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
  askExpiration: () => {
    const questions = [
      {
        name: 'expires',
        type: 'input',
        message: 'Enter the number of hours until token expiration (default is 12h):',
        default: 12,
        validate: (value) => {
          if (!value || !Number.isNaN(parseFloat(value))) {
            return true;
          } else {
            return 'You must enter a valid number.';
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
};
