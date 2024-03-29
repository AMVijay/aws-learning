# CloudFront Request Authorization

## Introduction
* Here, the goal is to implement authorization in Cloudfront which acts as Gateway for backend services for REST API, HTTP API, Load Balancer, Content Delivery.

## Design Constraints
* Deployed Lambda size can't be more than 1 MB. If the lambda size is more than 1 MB, that can't be configured in CloudFront as edge function.
* Lambda function must needs to be deployed in us-east-1 (Primary region for AWS). This lambda function will be replicated to edge locations when CloudFront is configured with that function.
* Deployed lambda should not have any environment variables.
* Deployed lambda memory configuration should not exceed 128MB.
* Deployed lambda timeout should not exceed 5 secs. 
* Need to make sure Lambda IAM role has permission to create cloudwatch logs in all region.
```
{
  "Effect": "Allow",
  "Action": [
    "logs:CreateLogStream",
    "logs:PutLogEvents",
    "logs:CreateLogGroup"
  ],
  "Resource": [
    "arn:aws:logs:*:*:*"
  ]
}
```
if not, cloudfront will return 503 error with error message `The Lambda function associated with the CloudFront distribution is invalid or doesn't have the required permissions.`
* If request headers needs to be passed to Lambda, then make sure the corresponding policy selected accordingly.
Example: 
![cloudfront-policy-config](https://github.com/AMVijay/aws-learning/assets/8252947/6eabcd7c-c516-4b3a-adcb-83a2d4f5a442)

## Design
![cloudfront-authorizer-design](https://github.com/AMVijay/aws-learning/assets/8252947/6becf97f-9620-4da0-80c7-1f975249510e)

