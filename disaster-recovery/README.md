# Disaster Recovery Solution Design

## Objective
Disaster Recovery Design depends on two main parameters RPO and RTO.   
RPO stands for Recovery Point Objective, It defines how much old data should be recovered during Disaster Recovery.
* Example 1: If RPO is 10 mins, then DR design should not loose data older than 10 mins during recovery process and continue to run. 
* Exmaple 2: If RPO is 4 hrs, then DR design should not loose older than 4 hrs of business data during recovery process and back to continue to run.

RTO stands for Recovery Time Objective. It defines how much time will be taken to bring the application fully functional after Disaster Recovery. 
* Example 1: If RTO is 1 hr, then DR Design should bring the application functional in 1 hr when disaster occurs.
* Example 2: If RTO is 24 hr, then DR Design should bring the application functional within 24 hrs when disaster occurs. 

## Disaster Recovery Design Strategy
* Option 1 - Backup and restore
* Option 2 - Replicate Data and keep it ready to use anytime. But don't run any other services.
* Option 3 - Active / Passive Concept - Keep services also up but with reduced capacity.
* Option 4 - Active / Active

### Option 4 - Active/Active - Solution Design
Below is an example solution design for Active/Active Strategy.  

![disaster-recover-design](https://user-images.githubusercontent.com/8252947/197955933-81c1d06d-439b-46d4-bf40-a46255c7eb84.jpg)

**Design Summary:**
* Important items in this design are CloudFront and DynamodB. Rest of all other services are mirrored in DR region as same as Prod region.
* **CloudFront** - It needs to route the requests to both region as Active as Active. 
    * To achieve this, CloudFront Origin configuration would have both region API Gateways by grouping them in Origin Group.
* **DynamoDB** - It needs to sync both region data without any miss. 
    * To achieve this, need to configure DynamoDB tables as Global Tables to sync with other region.     

### Option 3 - Active / Passive - Solution Design

Below is an example design with active - passive strategy. 


**Design Summary:**

