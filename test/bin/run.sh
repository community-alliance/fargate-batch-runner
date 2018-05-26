#!/bin/sh

echo "BUCKET $BUCKET"

aws s3api create-bucket --bucket ${BUCKET} --region us-east-1