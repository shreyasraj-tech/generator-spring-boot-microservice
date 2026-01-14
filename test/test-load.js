/*global describe, beforeEach, it*/
'use strict';

var helpers = require('yeoman-test');
var fs = require('fs');
var assert = require('assert');
var path = require('path');

describe('spring generator', function () {
  it('can be imported without blowing up', function () {
    var app = require('../app');
    assert(app !== undefined);
  });
});

describe('docker-compose generation', function () {
  describe('with PostgreSQL', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../project'))
        .withPrompts({
          dbType: 'PostgreSQL',
          projectName: 'testapp',
          baseName: 'testapp'
        })
        .on('end', done);
    });

    it('should generate docker-compose.yml with PostgreSQL service', function () {
      var content = fs.readFileSync(path.join(process.cwd(), 'docker-compose.yml'), 'utf8');
      assert.match(content, /image: postgres/);
      assert.match(content, /POSTGRES_USER: postgres/);
      assert.match(content, /POSTGRES_DB: testapp/);
      assert.match(content, /SPRING_DATASOURCE_URL: jdbc:postgresql:\/\/db:5432\/testapp/);
    });
  });

  describe('with MySQL', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../project'))
        .withPrompts({
          dbType: 'MySQL',
          projectName: 'testapp',
          baseName: 'testapp'
        })
        .on('end', done);
    });

    it('should generate docker-compose.yml with MySQL service', function () {
      var content = fs.readFileSync(path.join(process.cwd(), 'docker-compose.yml'), 'utf8');
      assert.match(content, /image: mysql:5.7/);
      assert.match(content, /MYSQL_ROOT_PASSWORD: .+/);
      assert.match(content, /MYSQL_DATABASE: testapp/);
      assert.match(content, /SPRING_DATASOURCE_URL: jdbc:mysql:\/\/db:3306\/testapp/);
    });
  });

  describe('with MongoDB', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../project'))
        .withPrompts({
          dbType: 'MongoDB',
          projectName: 'testapp',
          baseName: 'testapp'
        })
        .on('end', done);
    });

    it('should generate docker-compose.yml with MongoDB service', function () {
      var content = fs.readFileSync(path.join(process.cwd(), 'docker-compose.yml'), 'utf8');
      assert.match(content, /image: mongo/);
      assert.match(content, /SPRING_DATA_MONGODB_URI: mongodb:\/\/mongo:27017\/testapp/);
    });
  });

  describe('with None', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../project'))
        .withPrompts({
          dbType: 'None',
          projectName: 'testapp',
          baseName: 'testapp'
        })
        .on('end', done);
    });

    it('should generate docker-compose.yml without database services', function () {
      var content = fs.readFileSync(path.join(process.cwd(), 'docker-compose.yml'), 'utf8');
      assert.noMatch(content, /image: postgres/);
      assert.noMatch(content, /image: mysql/);
      assert.noMatch(content, /image: mongo/);
    });
  });

  describe('network configuration', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../project'))
        .withPrompts({
          dbType: 'PostgreSQL',
          projectName: 'testapp',
          baseName: 'testapp'
        })
        .on('end', done);
    });

    it('should configure network with my-network bridge', function () {
      var content = fs.readFileSync(path.join(process.cwd(), 'docker-compose.yml'), 'utf8');
      assert.match(content, /my-network:/);
      assert.match(content, /- my-network/);
    });
  });
});
