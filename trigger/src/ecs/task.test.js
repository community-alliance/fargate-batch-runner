'use strict'

const expect = require('expect');
const task = require('./task');
// Test a sync action
describe('Task', () => {
    describe('createDefinition', () => {
        it('should add cluster', () => {
            //arrange
            const config = { cluster: "clustername" };
            const expected = config.cluster;
            //act
            const actual = task.createDefinition("", "", config).cluster;

            //assert
            expect(actual).toEqual(expected);
        });
        it('should add taskDefinition', () => {
            //arrange
            const config = { taskDefinition: "taskDef" };
            const expected = config.taskDefinition;
            //act
            const actual = task.createDefinition("", "", config).taskDefinition;

            //assert
            expect(actual).toEqual(expected);
        });
        it('should add subnet1', () => {
            //arrange
            const config = { subnet1: "subnet1" };
            const expected = config.subnet1;
            //act
            const actual = task.createDefinition("", "", config).networkConfiguration.awsvpcConfiguration.subnets[0];

            //assert
            expect(actual).toEqual(expected);
        });
        it('should add subnet2', () => {
            //arrange
            const config = { subnet2: "subnet2" };
            const expected = config.subnet2;
            //act
            const actual = task.createDefinition("", "", config).networkConfiguration.awsvpcConfiguration.subnets[0];

            //assert
            expect(actual).toEqual(expected);
        });
        it('should add securityGroup', () => {
            //arrange
            const config = { securityGroup: "securityGroup" };
            const expected = config.securityGroup;
            //act
            const actual = task.createDefinition("", "", config).networkConfiguration.awsvpcConfiguration.securityGroups[0];

            //assert
            expect(actual).toEqual(expected);
        });
        it('should add name', () => {
            //arrange
            const config = { name: "name" };
            const expected = config.name;
            //act
            const actual = task.createDefinition("", "", config).overrides.containerOverrides[0].name;

            //assert
            expect(actual).toEqual(expected);
        });
        it('bucket and key', () => {
            //arrange
            const key = "KEY";
            const bucket = "BUCKET";
            const expected = [{ name: 'BUCKET', value: bucket }, { name: 'KEY', value: key }]
            //act
            const actual = task.createDefinition(bucket, key, {}).overrides.containerOverrides[0].environment;

            //assert
            expect(actual).toMatchObject(expected);
        });
        it('should add taskRoleArn', () => {
            //arrange
            const config = { taskRoleArn: "taskRoleArn" };
            const expected = config.taskRoleArn;
            //act
            const actual = task.createDefinition("", "", config).overrides.taskRoleArn;

            //assert
            expect(actual).toEqual(expected);
        });
        it('should add environment json string', () => {
            //arrange
            const config = { jsonString: '{"KEY": "VALUE"}' };
            const expected = [{ name: "KEY", value: "VALUE" }];
            //act
            const actual = task.createDefinition("", "", config).overrides.containerOverrides[0].environment;

            //assert
            expect(actual).toEqual(expected);
        });
        it('should add task definition', () => {
            //arrange
            const config = {
                cluster: "CLUSTER",
                taskDefinition: "TASKDEFINTION",
                subnet1: "SUBNET1",
                subnet2: "SUBNET2",
                securityGroup: "SECURITYGROUP",
                name: "NAME",
                taskRoleArn: "TASKROLEARN",
                jsonString: '{"KEY": "VALUE"}'
            }
            const expected = {
                cluster: "CLUSTER",
                taskDefinition: "TASKDEFINTION",
                count: 1,
                launchType: "FARGATE",
                networkConfiguration: {
                    awsvpcConfiguration: {
                        subnets: ["SUBNET1", "SUBNET2"],
                        assignPublicIp: "ENABLED",
                        securityGroups: ["SECURITYGROUP"]
                    }
                },
                overrides: {
                    containerOverrides: [
                        {
                            environment: [
                                {
                                    "name": "BUCKET",
                                    "value": "BUCKETVAL"
                                },
                                {
                                    "name": "KEY",
                                    "value": "KEYVAL"
                                },
                                {
                                    "name": "KEY",
                                    "value": "VALUE"
                                }
                            ],
                            name: "NAME"
                        }
                    ],
                    taskRoleArn: "TASKROLEARN"
                }
            };
            //act
            const actual = task.createDefinition("BUCKETVAL", "KEYVAL", config);

            //assert
            expect(actual).toEqual(expected);
        });
        it('should add bucket and config values', () => {
            //arrange
            const config = {
                cluster: "CLUSTER",
                taskDefinition: "TASKDEFINTION",
                subnet1: "SUBNET1",
                subnet2: "SUBNET2",
                securityGroup: "SECURITYGROUP",
                name: "NAME",
                taskRoleArn: "TASKROLEARN"
            };
            const expected = {
                cluster: "CLUSTER",
                taskDefinition: "TASKDEFINTION",
                count: 1,
                launchType: "FARGATE",
                networkConfiguration: {
                    awsvpcConfiguration: {
                        subnets: ["SUBNET1", "SUBNET2"],
                        assignPublicIp: "ENABLED",
                        securityGroups: ["SECURITYGROUP"]
                    }
                },
                overrides: {
                    containerOverrides: [
                        {
                            environment: [
                                {
                                    "name": "BUCKET",
                                    "value": "BUCKETVAL"
                                },
                                {
                                    "name": "KEY",
                                    "value": "KEYVAL"
                                }
                            ],
                            name: "NAME"
                        }
                    ],
                    taskRoleArn: "TASKROLEARN"
                }
            };
            //act
            const actual = task.createDefinition("BUCKETVAL", "KEYVAL", config);

            //assert
            expect(actual).toEqual(expected);
        });
    });
});