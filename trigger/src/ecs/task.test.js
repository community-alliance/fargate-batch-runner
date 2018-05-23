'use strict'

const expect = require('expect');
const task = require('./task');
// Test a sync action
describe('Task', () => {
    describe('createDefinition', () => {
        it('should add cluster', () => {
            //arrange
            const config = {cluster: "clustername"};
            const expected = config.cluster;
            //act
            const actual = task.createDefinition("","",config).cluster;

            //assert
            expect(actual).toEqual(expected);
        });
        it('should add taskDefinition', () => {
            //arrange
            const config = {taskDefinition: "taskDef"};
            const expected = config.taskDefinition;
            //act
            const actual = task.createDefinition("","",config).taskDefinition;

            //assert
            expect(actual).toEqual(expected);
        });
        it('should add subnet1', () => {
            //arrange
            const config = {subnet1: "subnet1"};
            const expected = config.subnet1;
            //act
            const actual = task.createDefinition("","",config).networkConfiguration.awsvpcConfiguration.subnets[0];

            //assert
            expect(actual).toEqual(expected);
        });
        it('should add subnet2', () => {
            //arrange
            const config = {subnet2: "subnet2"};
            const expected = config.subnet2;
            console.log(config)
            //act
            const actual = task.createDefinition("","",config).networkConfiguration.awsvpcConfiguration.subnets[0];

            //assert
            expect(actual).toEqual(expected);
        });
        it('should add securityGroup', () => {
            //arrange
            const config = {securityGroup: "securityGroup"};
            const expected = config.securityGroup;
            console.log(config)
            //act
            const actual = task.createDefinition("","",config).networkConfiguration.awsvpcConfiguration.securityGroups[0];

            //assert
            expect(actual).toEqual(expected);
        });
        it('should add name', () => {
            //arrange
            const config = {name: "name"};
            const expected = config.name;
            //act
            const actual = task.createDefinition("","",config).overrides.containerOverrides[0].name;

            //assert
            expect(actual).toEqual(expected);
        });
        it('bucket and key', () => {
            //arrange
            const key = "KEY";
            const bucket = "BUCKET";
            const expected = [{name:'BUCKET', value: bucket},{name:'KEY', value: key}]
            //act
            const actual = task.createDefinition(bucket,key,{}).overrides.containerOverrides[0].environment;

            //assert
            expect(actual).toMatchObject(expected);
        });
        it('should add taskRoleArn', () => {
            //arrange
            const config = {taskRoleArn: "taskRoleArn"};
            const expected = config.taskRoleArn;
            //act
            const actual = task.createDefinition("","",config).overrides.taskRoleArn;

            //assert
            expect(actual).toEqual(expected);
        });
    });
  });