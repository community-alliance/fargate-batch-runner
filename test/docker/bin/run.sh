#!/bin/sh

echo "BUCKET $NEW_BUCKET"

aws s3api create-bucket --bucket ${NEW_BUCKET} --region us-east-1