#!/bin/sh

TRIGGER_BUCKET=$1
TRIGGER=$2
NEW_BUCKET=$3
NEW_BUCKET_REGION=$4

echo "Creating IAM Role for task"
aws cloudformation package --template-file cloudformation.yml --output-template-file output.yml --s3-bucket moodle.deployables
aws cloudformation deploy --template-file output.yml --stack-name testrunnerrole --capabilities CAPABILITY_IAM

echo "Uploading file to s3 bucket to trigger lambda function ${TRIGGER_BUCKET}"

aws s3 cp ${TRIGGER} s3://$TRIGGER_BUCKET

# make a silly little hack test to see if bucket was created by
# checking the bucket region location.  My understanding
# is this should fail with exit code 255 if it doesn't exist
bucketregion=`aws s3api get-bucket-location ${NEW_BUCKET}`

#Check exit code

if [ "$?" != 0 ]
then 
    echo "get location for $bucketregion failed"
    exit 1
fi

# otherwise cleanup 
aws s3api delete-bucket --bucket ${NEW_BUCKET}

