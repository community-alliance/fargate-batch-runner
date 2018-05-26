#!/bin/bash

set -e
${ROLE_STACK}

aws cloudformation delete-stack --stack-name ${ROLE_STACK}