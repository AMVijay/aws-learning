# DynamoDB

## Enable TTL in Table

* TTL (Time to live) is important feature of DynamoDB. It helps to expire a record/item from table, which means that item will be auto deleted after TTL period.
* TTL would be based on attribute available in the item, and it should be in Epoch time format.
    * Epoch time format is also called unix time format. It is number of seconds elapsed 00:00:00 UTC on 1 January 1970.

 