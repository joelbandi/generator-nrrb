'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const Promise = require('bluebird');

module.exports = class extends Generator {
  initializing() {
    this.log(yosay(
      'Welcome to the Joel\'s ' + chalk.bold.cyan('nrrb') + ' generator!'
    ));
  }
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'project_name',
        message: 'Your project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your project\'s description',
        default: '{your-app\'s-description}'
      },
      {
        type: 'input',
        name: 'github_username',
        message: 'Your github username',
        default: '{github-user-name}',
        store: true
      },
      {
        type: 'confirm',
        name: 'use-yarn',
        message: 'Do you want to use yarn?',
        default: false,
        store: true
      }
    ]).then((answers) => {
      this.answers = answers;
    });
  }
  install() {
    this.log(this.answers);
  }
};
