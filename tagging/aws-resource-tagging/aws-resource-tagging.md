# AWS resource tagging

Below approach would help in deriving command for resource tags and execute it quickly for all existing resource.

## S3 Resource tagging
* Step 1: Create tag scripts
`aws s3api list-buckets | jq -r '.Buckets[] | "aws resourcegroupstaggingapi tag-resources --resource-arn-list arn:aws:s3:::"+.Name+" --tags <key1>=<value1>,<key2>=<value2"' > s3-tag-script.sh`
* Step 2: execute the script `./s3-tag-script.sh`

### Adding condition in resource match
* Here, added `select(<field name> | contains(<string>))` filters the data matching the string in the field names.

`aws s3api list-buckets | jq -r '.Buckets[] | select(.Name | contains("dev")) | "aws resourcegroupstaggingapi tag-resources --resource-arn-list arn:aws:s3:::"+.Name+" --tags <key1>=<value1>,<key2>=<value2"'`

## IAM Roles tagging

