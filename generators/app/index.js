'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

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
  gitignore() {
    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
  }
  otherRootFiles() {
    var fileList = [
      '.babelrc',
      'index.html',
      'LICENSE.MD',
      'webpack.config.js',
      'yarn.lock'
    ];
    fileList.map(file => {
      this.log(this.templatePath(file));
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(file)
      );
    });
  }
  srcFiles() {
    this.fs.copy(
      this.templatePath('src/**/*'),
      this.destinationPath('src')
    );
  }
  testFiles() {
    this.fs.copy(
      this.templatePath('test/**/*'),
      this.destinationPath('test')
    );
  }
  install() {
    if (this.answers.use_yarn) {
      this.yarnInstall();
    } else {
      this.npmInstall();
    }
  }
  end() {
    this.log(yosay(
      'Goodbye and see you soon!'
    ));
  }
};
