# DynamoDB

## Introduction
* DynamoDB is a NoSQL database.
* DynamoDB is defined as Table -> collection of Items -> collection of Attributes.
* DynamoDB attribute datatypes are Number, String, Boolean, List, Map, Set.
* Max size of each item can be 400 KB.

## Indexes in DynamoDB
* Each table must have One Partition Key. Partition Key is one of the attribute from the table and that should be unique. 
* Partition Key can have a sort key from the table .

## Capacity of DynamoDB
* RCU - Read Capacity Units
* WCU - Write Capacity Units

## Create Table using AWS CLI
* `aws dynamodb create-table`

## Enable TTL in Table
* TTL (Time to live) is important feature of DynamoDB. It helps to expire a record/item from table, which means that item will be auto deleted after TTL period.
* TTL would be based on attribute available in the item, and it should be in Epoch time format.
    * Epoch time format is also called unix time format. It is number of seconds elapsed 00:00:00 UTC on 1 January 1970.
* TTL can be enabled in any of below ways
    * In Console, Navigate to Additional Settings of the table, and enable TTL by pointing the attribute holding epoch time format attribute.
 
 