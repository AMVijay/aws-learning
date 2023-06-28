# AWS Cross Account Access to API Gateway from Lambda

## Introduction
* AWS Account A (lets name it as ServiceProvider) hosts REST API using API Gateway. 
* AWS Account B (lets name it as ServiceConsumer) has REST Client using Lambda. 
* Now Lambda hosted in ServiceConsumer account needs to access REST API hosted in ServiceProvider account with AWS IAM authorization.

## Design

![20230627-cross-account-api-authorization](https://github.com/AMVijay/aws-learning/assets/8252947/958a92cd-350e-4757-ad84-a65832166ca9)

## API Gateway Configuration with AWS IAM authorizer

### Steps to do in AWS Account A Service Provider
1. REST API setup and configuration in API Gateway configuration.
2. Enable AWS IAM for the REST API.
3. IAM Role Configuration with Trust Relation enabled for AWS Account B Service Consumer.

## Steps to do in AWS Account B Service Consumer
1. Create Policy with Trust Relationship to access Accou t A Role created earlier. 
2. Create IAM role and attach the policy created earlier and use this role for Lambda execution. 
3. Create Lambda with below logic 
    * Get STS Token for Role of Account A.
    * Get Signature for the request data.
    * Send the signed request data. 


## IAM roles configuration in ServiceProvider and ServiceConsumer

### IAM Role Config in Service Provider Account
* AWS Managed Policy `AmazonAPIGatewayInvokeFullAccess` is assigned with below stated Trust Relationships.
#### Role Permission Configuration
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "execute-api:Invoke",
                "execute-api:ManageConnections"
            ],
            "Resource": "arn:aws:execute-api:*:*:*"
        }
    ]
}
```
#### Role Trust Relationships
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<ServiceConsumer AWS Account Number>:root"
            },
            "Action": "sts:AssumeRole",
            "Condition": {}
        }
    ]
}
```

### IAM Config in Service Consumer account 
#### Custom Policy  
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::<Service Provider AWS Account Number>:role/<Role Name from Service Provider Account>"
        }
    ]
}
```
* Attach this policy to the Lambda IAM Role.


## Lambda RESTClient POC with Cross account authorization and Access API
Refer the lambda source in repo 


## Conclusion


