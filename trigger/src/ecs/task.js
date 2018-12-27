'use strict'
const logger = require('../logger/logger').logger
const parseEnvironmentJson = require('../config/config').parseEnvironmentJson;

// Create an ECS Task definition
exports.createDefinition = (bucket, key, config) => {
    
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
    logger.info("Using params ", tempParams)
    const environment = parseEnvironmentJson(config.jsonString);

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
    if(bucket && bucket !== ""){
        tempParams.overrides.containerOverrides[0].environment.push({name:'BUCKET', value: bucket})
    }
    if(key && key !== ""){
        tempParams.overrides.containerOverrides[0].environment.push({name:'KEY', value: key})   
    }
    if(Object.keys(environment).length !== 0 && environment.constructor !== Object){
        tempParams.overrides.containerOverrides[0].environment.push(environment)
    }
    tempParams.overrides.taskRoleArn = config.taskRoleArn
    logger.info("Created tempparams ", tempParams)
    return tempParams;
}
