# AWS Cost Analysis


## List all the resources in an AWS Account by region.

* Using `resourcegrouptaggingapi` command, can get list of resource ARN for specific region and resource type.  
Example: 
`aws resourcegroupstaggingapi get-resources --region us-west-2 --resource-type-filters <resource types> | jq .ResourceTagMappingList[].ResourceARN`

### resources types
* s3:buckets
* ec2:VPC
