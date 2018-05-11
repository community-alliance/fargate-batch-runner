#!/bin/bash

set -e

UPLOAD_BUCKET=$1
STACK_NAME=$2
S3_BUCKET=$3
CONTAINER_NAME=$4
SERVICE_NAME=$5
ECS_CLUSTER=$6
IMAGE=$7
TASK_ROLE_ARN=$8
TASK_SUBNETS=$9
echo "Packing assets"
##
# Package API Gateway Assets
##
aws cloudformation package --template-file \
    trigger/lambda-s3-trigger.yml --output-template-file \
    lambda-s3-trigger-output.yml --s3-bucket $UPLOAD_BUCKET

echo "Deploying assets"
##
# Deploy Assets
##
aws cloudformation deploy --template-file \
    lambda-s3-trigger-output.yml --capabilities CAPABILITY_IAM \
    --stack-name ${STACK_NAME}  --parameter-overrides \
    BucketName=${S3_BUCKET} ContainerName=${CONTAINER_NAME} \
    ServiceName=${SERVICE_NAME} ECSCluster=${ECS_CLUSTER} \
    Image=${IMAGE} TaskRoleArn=${TASK_ROLE_ARN} TaskSubnets=${TASK_SUBNETS}