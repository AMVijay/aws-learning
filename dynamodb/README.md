# DynamoDB

## Introduction
* DynamoDB is a NoSQL database.
* DynamoDB is defined as Table -> collection of Items -> collection of Attributes.
* DynamoDB attribute datatypes are Number, String, Boolean.
    * **TODO** - Need to check List, Map, Set.
* Max size of each item can be 400 KB.

## Partition Key and Sort Key in DynamoDB
* Partition Key
    * It is the primary key for the table. By definition, primary key attribute should be unique. 
    * It is mandatory to create table.
    * This partition key is stored as hash value. 
    * It is used in data retrival from storage nodes.  
* Sort Key
    * Sort Key is defined from another attribute present in all items apart from partition key.
    * Partition Key + Sort Key together makes composite key.
    * It enables a partition to store more than one item in order.

## Index Concepts
* DynamoDB allows to define Secondary Indexes which help to define more composite keys apart from Primary Partition Key and Sort Key.
* Two types secondary index are available in DynamoDB. 
    1. Local Secondary Index - Adding new sort Key to the Primary Partition Key.
    2. Global Secondary Index - Creating new Partition Key (mandatory) + Sort Key.

## Capacity of DynamoDB
* DynamoDB capacity is separated by Read and Write. Read capacity is defined using RCU - Read Capacity Units. Write Capacity is defined using WCU - Write Capacity Units. 
* RCU and WCU can be changed independent of other one based on need.
* Both RCU and WCU can be defined 
    * Provisioned - Allocating the defined compute units always. 
    * On-Demand - Pay per use concept.
* Provisioned Configuration has Auto Scaling option available. It allows to configure the minimum capacity units, max capacity units and the condition to auto scale from minimum to maximum.

## Export and Backup
* By enabling the PITR (Point InTime Recovery), table content can be exported to S3 Bucket. Export Content will be in DynamoDB JSON format. 

## Create Table using AWS CLI
* `aws dynamodb create-table`

## Enable TTL in Table
* TTL (Time to live) is important feature of DynamoDB. It helps to expire a record/item from table, which means that item will be auto deleted after TTL period.
* TTL would be based on attribute available in the item, and it should be in Epoch time format.
    * Epoch time format is also called unix time format. It is number of seconds elapsed 00:00:00 UTC on 1 January 1970.
* TTL can be enabled in any of below ways
    * In Console, Navigate to Additional Settings of the table, and enable TTL by pointing the attribute holding epoch time format attribute.
 
 