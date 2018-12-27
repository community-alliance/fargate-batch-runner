#!/bin/sh

set -e

TRIGGER_BUCKET=$1
TRIGGER=$2
NEW_BUCKET=$3
NEW_BUCKET_REGION=$4

echo "Uploading file to s3 bucket to trigger lambda function ${TRIGGER_BUCKET}"

aws s3 cp ${TRIGGER} s3://$TRIGGER_BUCKET

#sleep for a bit to allow the task to run
sleep 90

# make a silly little hack test to see if bucket was created by
# checking the bucket region location.  My understanding
# is this should fail with exit code 255 if it doesn't exist
bucketregion=`aws s3api get-bucket-location --bucket ${NEW_BUCKET}`

#Check exit code

if [ "$?" != 0 ]
then 
    echo "get location for $bucketregion failed"
    exit 1
fi

#delete trigger file
aws s3 rm  s3://$TRIGGER_BUCKET/${TRIGGER}



