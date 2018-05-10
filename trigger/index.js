'use strict';

console.log('Loading function');

const aws = require('aws-sdk');

var ecs = new AWS.ECS({apiVersion: '2014-11-13'});

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    // Get the object from the event and show its content type
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        cluster: process.env.CLUSTER, 
        taskDefinition: process.env.TASK_DEFINITION,
        networkConfiguration: {
            awsvpcConfiguration: {
            //   subnets: [ /* required */
            //     'STRING_VALUE',
            //     /* more items */
            //   ],
              assignPublicIp: DISABLED
            //   ,
            //   securityGroups: [
            //     'STRING_VALUE',
            //     /* more items */
            //   ]
            }
          },
          overrides: {
            containerOverrides: [
              {
                environment: [
                  {
                    name: 'BUCKET',
                    value: bucket
                  },
                  {
                    name: 'KEY',
                    value: key
                  }
                ]
              }
            ],
            taskRoleArn: process.env.TASK_ROLE_ARN
          }
       };
    console.log(params)
    ecs.runTask(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
};