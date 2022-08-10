# VPC

Virtual Private Cloud provides the feature to create our own private cloud network.

## VPC Features 
* [VPC Subnets](#vpc-subnets)
* [VPC Peering](#vpc-peering)
* [VPC Endpoints](#vpc-endpoints)


### VPC Subnets
* VPC Subnet is a logical separation of group of IP address inside private cloud IP range.
* VPC Subnet can be Public subnet or Private Subnet.
* A VPC can have 0 or more Public subnets and 0 or more Private subnets. But must need to have either one of Public or Private subnet. 

### VPC Peering 
* VPC Peering allows to connect 2 VPCs
    * from same account or different account
    * from same region or different region.
* Rule - VPC Peering can be established when there is no IP Range conflict between VPCs. 
    * If  
        * VPC1 IP Range is 10.0.0.0/24 => From 10.0.0.0 to 10.0.0.255  
        * VPC2 IP Range is 10.0.0.128/25 => From 10.0.0.128 to 10.0.0.255
        * then it is **not possible** to do VPC Peering between VPC1 and VPC2.
    * If  
        * VPC1 IP Range is 10.0.0.0/24 => From 10.0.0.0 to 10.0.0.255  
        * VPC2 IP Range is 10.0.1.128/25 => From 10.0.1.128 to 10.0.1.255
        * then it is **possible** to do VPC Peering between VPC1 and VPC2.
* Setup Steps  
    1. Click Peering Connection link in VPC Page.
    2. Enter name for Peering Connection, target VPC id in same account or different account and same region or different region.
    3. Submit. 
    4. In the target VPC, Click Peering Connection link in VPC Page.
    5. Select the Peering connection request and approve from Actions menu.   

### VPC Endpoints

* VPC Endpoints help to create Private Endpoint accessible only within VPC.