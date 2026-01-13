'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');

var SpringGenerator = module.exports = function SpringGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
};

util.inherits(SpringGenerator, yeoman.generators.Base);

SpringGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    console.log(chalk.green('\n.............DD88888888888888888,............\n' +
        '...........:888888888888888888888,...........\n' +
        '..........+88888888888888888888888+..........\n' +
        '.........,8888888888888888888888888..........\n' +
        '.........888888888888...888888888888.........\n' +
        '.......,88888887..D88...88Z..88888888,.......\n' +
        '.......8888888,...888...88D...=8888888.......\n' +
        '......D888888,..$8888...88887...8888888......\n' +
        '.....Z888888$..I88888...88888:..88888888,....\n' +
        '....D8888888...888888...88888D..,88888888....\n' +
        '....88888888,..888888..,888888...88888888....\n' +
        '....88888888,..8888888$888888D..,88888888....\n' +
        '....88888888I..Z8888888888888+..888888888....\n' +
        '.....Z8888888...O888888888888..,88888888.....\n' +
        '......88888888...,88888888D...,88888888......\n' +
        '.......88888888=.....?I+.....I88888888.......\n' +
        '.......,88888888D7.........ZD88888888,.......\n' +
        '.........888888888888888888888888888.........\n' +
        '.........,8888888888888888888888888..........\n' +
        '..........+88888888888888888888888+..........\n' +
        '...........,888888888888888888888:...........\n' +
        '.............DD888888888888888DD.............\n' +
        chalk.yellow('\nWelcome to the Spring Boot Generator\n\nLets get started!\n\n')));


    var prompts = [
        {
            type: 'string',
            name: 'projectName',
            message: 'Enter project name:',
        } 
        ,
        {
            type: 'list',
            name: 'dbType',
            message: 'Select the database type:',
            choices: ['PostgreSQL', 'MySQL', 'MongoDB', 'None'],
            default: 'None'
        }
        ,
        {
            type: 'string',
            name: 'javaVersion',
            message: 'Enter the Java Version',
            default: '1.8'
        }
        , 
        {
            type: 'string',
            name: 'springBootVersion',
            message: 'Enter the version of spring boot',
            default: '1.5.2.RELEASE'
        }
        ,
        	{
        		type: 'string',
        		name: 'springVersion',
        		message: 'Enter the spring version',
        		default: '4.3.4.RELEASE'
        	}
        	,
        	{
        		type: 'string',
        		name: 'springCloudVersion',
        		message: 'Enter the spring cloud version',
        		default: 'Dalston.SR1'
        	}
            ,
            {
                type: 'string',
                name: 'springCloudSsoVersion',
                message: 'Enter the spring cloud SSO version',
                default: '1.1.0.RELEASE'
            }
            ,
            {
                type: 'string',
                name: 'springCloudServicesVersion',
                message: 'Enter the spring cloud services version',
                default: '1.3.1.RELEASE'
            }
            ,
            {
                type: 'string',
                name: 'springSecurityVersion',
                message: 'Enter the spring security version',
                default: '4.1.3.RELEASE'
            },
            {
                type: 'string',
                name: 'kafkaVersion',
                message: 'Enter the spring kafka version',
                default: '2.1.0.RELEASE'
            }
            ,
            {
                type: 'string',
                name: 'hibernateVersion',
                message: 'Enter the hibernate version',
                default: '5.0.11.Final'
            }
            ,
            {
                type: 'string',
                name: 'slf4jVersion',
                message: 'Enter the SLF4 version',
                default: '1.7.21'
            }
            ,
            {
                type: 'string',
                name: 'junitVersion',
                message: 'Enter the JUnit version',
                default: '4.12'
            }
            ,
            {
                type: 'string',
                name: 'mysqlVersion',
                message: 'Enter the mysql version',
                default: '5.1.40'
            }
            ,
            {
                type: 'string',
                name: 'dockerVersion',
                message: 'Enter the docker version',
                default: '1.2'
            }
            
            
        

    ];

    this.prompt(prompts, function(props) {

        this.projectName = props.projectName;
        this.baseName = props.projectName;
        this.dbType = props.dbType;

        this.javaVersion = props.javaVersion;

        this.springBootVersion = props.springBootVersion;
        this.springVersion = props.springVersion;

        this.springCloudVersion = props.springCloudVersion;
        this.springCloudSsoVersion = props.springCloudSsoVersion;
        this.springCloudServicesVersion = props.springCloudServicesVersion;
        this.springSecurityVersion = props.springSecurityVersion;
        this.kafkaVersion = props.kafkaVersion;

        this.hibernateVersion = props.hibernateVersion;
        this.slf4jVersion = props.slf4jVersion;
        this.junitVersion = props.junitVersion;
        this.mysqlVersion = props.mysqlVersion;

        this.dockerVersion = props.dockerVersion;


        cb();
    }.bind(this));
};

SpringGenerator.prototype.app = function app() {

    var rootDir = this.projectName+'/';
    var appDir = rootDir+'applications';
    mkdirp(appDir);

    this.template('build.gradle', rootDir+'build.gradle');
    this.template('docker-compose.yml', rootDir+'docker-compose.yml');
    this.template('java.gradle', rootDir+'java.gradle');
    this.template('settings.gradle', rootDir+'settings.gradle');
};

SpringGenerator.prototype.projectfiles = function projectfiles() {};
