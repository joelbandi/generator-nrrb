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
        name: 'use_yarn',
        message: 'Do you want to use yarn?',
        default: false
      }
    ]).then(answers => {
      this.answers = answers;
      this.answers.depTool = this.answers.use_yarn ? 'yarn' : 'npm';
    });
  }
  readme() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.answers
    );
  }
  packageJSON() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.answers
    );
  }
  otherRootFiles() {
    var fileList = [
      '.babelrc',
      '.gitignore',
      'index.html',
      'LICENSE.MD',
      'webpack.config.js',
      'yarn.lock'
    ];
    fileList.map(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.answers
      );
    });
  }
};
