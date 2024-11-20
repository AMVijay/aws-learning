# AWS resource tagging

Below approach would help in deriving command for resource tags and execute it quickly for all existing resource.

## S3 Resource tagging
* Step 1: Create tag scripts
`aws s3api list-buckets | jq -r '.Buckets[] | "aws resourcegroupstaggingapi tag-resources --resource-arn-list arn:aws:s3:::"+.Name+" --tags <key1>=<value1>,<key2>=<value2"' > s3-tag-script.sh`
* Step 2: execute the script `./s3-tag-script.sh`

### Adding condition in resource match
* Here, added `select(<field name> | contains(<string>))` filters the data matching the string in the field names.
```
aws s3api list-buckets | jq -r '.Buckets[] | select(.Name | contains("dev")) | "aws resourcegroupstaggingapi tag-resources --resource-arn-list arn:aws:s3:::"+.Name+" --tags <key1>=<value1>,<key2>=<value2"'`
```

## IAM Roles tagging
Command to create script to apply tags to IAM roles with condition whichever role not having specific tags
```
aws iam list-roles | jq -r '.Roles[] | select(contains({Tags: [{Key: "<value>"} ]}) | not)| "aws resourcegroupstaggingapi tag-resources --resource-arn-list "+.Arn+" --tags tag-key1=value1"' > iam_tags-script.sh
``` 

## API Gateway tagging
Below command would help in creating script to apply tags for REST API Gateways in specific region : 
```
aws apigateway get-rest-apis --region us-west-2 | jq -r '.items[] | select(.name | contains("<condition>")) | "aws resourcegroupstaggingapi tag-resources --resource-arn-list arn:aws:apigateway:us-west-2::/restapis/"+.id+" --tags <tags values as key value pairs>"' > api-tags-script.sh
```
Example:
```
aws apigateway get-rest-apis --region us-west-2 | jq -r '.items[] | select(.name | contains("qa")) | "aws resourcegroupstaggingapi tag-resources --resource-arn-list arn:aws:apigateway:us-west-2::/restapis/"+.id+" --tags tag-key1=value1,tag-key2=value2"' > api-tags-script.sh
``` 

## Route53 tagging
Command to create script to apply tagging to Route53 resources
```
aws route53 list-hosted-zones | jq -r '.HostedZones[]| .Id | "aws resourcegroupstaggingapi tag-resources --resource-arn-list arn:aws:route53:::"+.[1:]+" --tags key1=value1,key2=value2"' > route53-tags-script.sh
```
Please execute this script from us-east-1 region.

## SNS Topics Tagging
```
aws sns list-topics | jq -r '.Topics[] | "aws resourcegroupstaggingapi tag-resources --resource-arn-list "+.TopicArn+" --tags key1=value1,key2=value2' > sns-tags-script.sh
```