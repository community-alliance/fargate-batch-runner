Application to run arbitraty batch Docker containers using AWS ECS Fargate


Thanks to [lobster1234](https://lobster1234.github.io/2017/12/03/run-tasks-with-aws-fargate-and-lambda/) for the inspiration


Components:

1. ECS Cluster (BYOC or Create one)
    a. IAM Role
        i. IAM Policy 
2. Lambda Controller Function
    a. IAM Role
        i. IAM Policy
3. Trigger
    a. S3
    b. Cloudwatch
4. ECS Task Definition
    a. IAM Role
        i. IAM Policy
5. Image
6. 


*Permission Model*
fargate-batch-runner has three AWS resources that require AWS permissions.
1. ECS Cluster
2. Lambda Controller Function
3. ECS Task

Lambda Controller- Needs permission to run an ECS task.  Sample permission values:
```- "ecs:DescribeServices"
- "ecs:DescribeTaskDefinition"
- "ecs:DescribeTasks"
- "ecs:ListServices"
- "ecs:ListTaskDefinitionFamilies"
- "ecs:ListTaskDefinitions"
- "ecs:ListTasks"
- "ecs:RegisterTaskDefinition"
- "ecs:RunTask"
- "ecs:StartTask"
- "ecs:StopTask"
- "ecs:UpdateService"```





