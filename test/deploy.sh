#!/bin/bash

set -e

UPLOAD_BUCKET=$1
STACK_NAME=$2
S3_BUCKET=$3
CONTAINER_NAME=$4
SERVICE_NAME=$5
ECS_CLUSTER=$6
IMAGE=$7
TASK_SUBNET1=$8
TASK_SUBNET2=$9
SG=${10}

##
# Package and deploy test ARN
##
echo "Creating IAM Role for task"

aws cloudformation package --template-file cloudformation.yml --output-template-file output.yml --s3-bucket $UPLOAD_BUCKET
aws cloudformation deploy --no-fail-on-empty-changeset --template-file output.yml --stack-name $ROLE_STACK --capabilities CAPABILITY_IAM

#get the TaskRoleARN
TASK_ROLE_ARN=`aws cloudformation describe-stacks --stack-name ${ROLE_STACK} --query 'Stacks[0].Outputs[0].OutputValue' --output text`

echo "Packing assets"
##
# Package API Gateway Assets
##
aws cloudformation package --template-file \
    ../trigger/lambda-s3-trigger.yml --output-template-file \
    lambda-s3-trigger-output.yml --s3-bucket $UPLOAD_BUCKET

echo "Deploying assets"
##
# Deploy Assets
##
aws cloudformation deploy --no-fail-on-empty-changeset --template-file \
    lambda-s3-trigger-output.yml --capabilities CAPABILITY_IAM \
    --stack-name ${STACK_NAME}  --parameter-overrides \
    BucketName=${S3_BUCKET} ContainerName=${CONTAINER_NAME} \
    ServiceName=${SERVICE_NAME} ECSCluster=${ECS_CLUSTER} \
    Image=${IMAGE} TaskRoleArn=${TASK_ROLE_ARN} TaskSubnet1=${TASK_SUBNET1} \
    TaskSubnet2=${TASK_SUBNET2} ContainerSG=${SG}

