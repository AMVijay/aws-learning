# DynamoDB tables Copy from One Account to Another Account

## Solution Options  
To copy DynamoDB tables from one account to another account, below are the options. 
1. Using AWS Backup, Create Backup of DynamoDB Table tables in Source Account and copy the backup to Target Account later.
2. Using DynamoDB Export to S3 option, export DynamoDB table data in DynamoDB JSON format directly in target account S3 bucket from source account. 
3. Using AWS Glue, export the table data into S3 and import into target table. Here, if need to apply condition to filter data, can do it here.