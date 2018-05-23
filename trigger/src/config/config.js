'use strict'

exports.function = () =>{
    return {
        cluster: process.env.CLUSTER,
        taskDefinition: process.env.TASK_DEFINITION, 
        subnet1: process.env.SUBNET1,
        subnet2: process.env.SUBNET2,
        securityGroup: process.env.SECURITYGROUP, 
        name: process.env.NAME,
        taskRoleArn: process.env.TASK_ROLE_ARN
    }
} 