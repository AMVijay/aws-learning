# CloudFront Request Authorization

## Introduction
* Here, the goal is to implement authorization in Cloudfront which acts as Gateway for backend services for REST API, HTTP API, Load Balancer, Content Delivery.

## Design Constraints
* Deployed Lambda size can't be more than 1 MB.

## Design
![cloudfront-authorizer-design](https://github.com/AMVijay/aws-learning/assets/8252947/6becf97f-9620-4da0-80c7-1f975249510e)
