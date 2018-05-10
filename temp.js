'use strict';

console.log('Loading function');

const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });


exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    // Get the object from the event and show its content type
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        Bucket: bucket,
        Key: key,
    };
    console.log(event.Records[0].s3)
    console.log(params)
    s3.getObject(params, (err, data) => {
        if (err) {
            console.log(err);
            const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
            console.log(message);
            callback(message);
        } else {
            console.log('Data:', data);
            callback(null, data.ContentType);
        }
    });
};

// Use this code snippet in your app.
// Load the AWS SDK
var AWS = require('aws-sdk'),
    endpoint = "https://secretsmanager.us-east-1.amazonaws.com",
    region = "us-east-1",
    secretName = "dev/project-feedme/rds",
    secret,
    binarySecretData;

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    endpoint: endpoint,
    region: region
});

client.getSecretValue({SecretId: secretName}, function(err, data) {
    if(err) {
        if(err.code === 'ResourceNotFoundException')
            console.log("The requested secret " + secretName + " was not found");
        else if(err.code === 'InvalidRequestException')
            console.log("The request was invalid due to: " + err.message);
        else if(err.code === 'InvalidParameterException')
            console.log("The request had invalid params: " + err.message);
    }
    else {
        // Decrypted secret using the associated KMS CMK
        // Depending on whether the secret was a string or binary, one of these fields will be populated
        if(data.SecretString !== "") {
            secret = data.SecretString;
        } else {
            binarySecretData = data.SecretBinary;
        }
    }
    
    // Your code goes here. 
    
});