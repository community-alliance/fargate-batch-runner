#!/bin/bash

set -e

ROLE_STACK=$1
NEW_BUCKET=$2
APP_NAME=$3

echo "deleting ${ROLE_STACK}"

aws cloudformation delete-stack --stack-name ${ROLE_STACK}

echo "deleting ${NEW_BUCKET}"

# otherwise cleanup 
aws s3api delete-bucket --bucket ${NEW_BUCKET}

echo "deleting ${NEW_BUCKET}"

aws cloudformation delete-stack --stack-name ${APP_NAME}

