/* eslint no-undef: 0 */  // --> OFF
'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var templatePackageJson = require('../generators/app/templates/package.json');

describe('generator-nrrb', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        project_name: 'test-app',
        description: 'test-description',
        github_username: 'test-username',
        use_yarn: false
      });
  });

  it('creates root files', () => {
    assert.file([
      '.babelrc',
      '.gitignore',
      'index.html',
      'LICENSE.MD',
      'package.json',
      'README.md',
      'webpack.config.js',
      'yarn.lock'
    ]);
  });

  it('creates src files', () => {
    assert.file([
      'src/assets/style.scss',
      'src/components/app.js',
      'src/modules/module.js',
      'src/index.js',
      'src/store.js'
    ]);
  });

  it('creates test files', () => {
    assert.file([
      'test/components/app_test.js',
      'test/test_helper.js'
    ]);
  });

  it('fills the README with project data', () => {
    assert.fileContent('README.md', '# test-app : test-description');
    assert.fileContent('README.md', '`npm run dev` to run development server');
    assert.fileContent('README.md', '`npm run build` when you want to create a production build in the `/dist` folder.');
  });

  it('fills package.json with correct information', () => {
    assert.JSONFileContent('package.json', { // eslint-disable-line new-cap
      name: 'test-app',
      version: '0.0.0',
      description: 'test-description',
      main: templatePackageJson.main,
      repository: 'git@github.com:test-username/test-app.git',
      scripts: templatePackageJson.scripts,
      author: 'test-username',
      license: "MIT",
      dependencies: templatePackageJson.dependencies,
      devDependencies: templatePackageJson.devDependencies,
    });
  });


});
