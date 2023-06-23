# AWS Cross Account Access to API Gateway from Lambda

## Introduction
* AWS Account A called ServiceProvider hosting REST API using API Gateway. 
* AWS Account B called ServiceConsumer having REST Client using Lambda. 
* Now Lambda hosted in ServiceConsumer account needs to access REST API hosted in ServiceProvider account in secure way.   