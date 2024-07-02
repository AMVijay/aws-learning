# AWS Cost Analysis


## List all the all resources in an AWS Account by region which are all tagged.

* Using `resourcegrouptaggingapi` command, can get list of resource ARN for specific region and resource type.  
Example: 
`aws resourcegroupstaggingapi get-resources --region us-west-2 | jq .ResourceTagMappingList[].ResourceARN`

With Filter to get specific resource types:  
`aws resourcegroupstaggingapi get-resources --region us-west-2 --resource-type-filters <resource types> | jq .ResourceTagMappingList[].ResourceARN`

### resources type filters 
* s3:buckets
* ec2:VPC
