'use strict'
const winston = require('winston');

// Create an ECS Task definition
exports.createDefinition = function(bucket, key, config) {
    
    let tempParams = Object.assign({}, {
        cluster: "",
        taskDefinition: "",
        count: 1,
        launchType: "FARGATE",
        networkConfiguration: {
            awsvpcConfiguration: {
                subnets: [],
                assignPublicIp: "ENABLED",
                securityGroups: []
            }
        },
        overrides: {
            containerOverrides: [
                {
                    environment: [],
                    name: ""
                }
            ],
            taskRoleArn: ""
        }
    });
    winston.info("Using params ", tempParams)

    //make replacements
    tempParams.cluster = config.cluster;
    tempParams.taskDefinition = config.taskDefinition;
    if(config.subnet1){
        tempParams.networkConfiguration.awsvpcConfiguration.subnets.push(config.subnet1);
    }
    if(config.subnet2){
        tempParams.networkConfiguration.awsvpcConfiguration.subnets.push(config.subnet2);
    }
    if(config.securityGroup){
        tempParams.networkConfiguration.awsvpcConfiguration.securityGroups.push(config.securityGroup);
    }
    tempParams.overrides.containerOverrides[0].name = config.name;
    tempParams.overrides.containerOverrides[0].environment.push({name:'BUCKET', value: bucket})
    tempParams.overrides.containerOverrides[0].environment.push({name:'KEY', value: key})
    tempParams.overrides.taskRoleArn = config.taskRoleArn
    winston.info("Created tempparams ", tempParams)
    return tempParams;
}
