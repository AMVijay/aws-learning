# Delete Lambda Versions using CLI

## Introduction
Here, will go through the steps to delete lambda published versions.
### scenario  
* This scenario raised while trying to delete a VPC. To delete VPC, need to make sure all ENI (elastic network interface) associated to that VPC should be deleted. 
* When a Lambda is configured to run inside VPC, ENI will be assigned having one of VPC IP. Whenever new Lambda version is published with change in VPC, still the older version would be available having configuration of old VPC. So until all the older Lambda versions deleted, the associated ENI can't be deleted.

## Solution Approach
* Need to manually delete the Lambda 

## Steps
* Need to list down the lambda names, VPC details. Command would be 
`aws lambda list-functions --region <region name> | jq -r '.Functions[] | .FunctionName+" "+.VpcConfig.VpcId'`
    * Output can be copied to notepad for reference.
* For each of the lambda listed above, need to check whether any lambda published versions associated to which VPC.


