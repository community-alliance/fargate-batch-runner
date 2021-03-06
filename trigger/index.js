'use strict';

const logger = require('./src/logger/logger').logger

logger.info('Loading function');

const aws = require('aws-sdk');

var ecs = new aws.ECS({apiVersion: '2014-11-13'});

const task = require('./src/ecs/task');

exports.handler = (event, context, callback) => {
    const config = {
        cluster: process.env.CLUSTER,
        taskDefinition: process.env.TASK_DEFINITION, 
        subnet1: process.env.SUBNET1,
        subnet2: process.env.SUBNET2,
        securityGroup: process.env.SECURITYGROUP, 
        name: process.env.NAME,
        taskRoleArn: process.env.TASK_ROLE_ARN,
        jsonString: process.env.ENV_JSON
    }
    //console.log('Received event:', JSON.stringify(event, null, 2));
    // Get the object from the event and show its content type
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    logger.info("About to create definition with ", bucket, key, config)
    let params = task.createDefinition(bucket, key, config);

    logger.info("created params ", params)

    ecs.runTask(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
};