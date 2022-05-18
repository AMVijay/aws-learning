# VPC

Virtual Private Cloud provides the feature to create our own private cloud network.

## VPC Features 
* [VPC Peering](./VPC Peering/README.md)


### VPC Peering 
* VPC Peering allows to connect 2 VPCs from same account or different account and same region or different region.
* VPC Peering can be established when there is no IP Range conflict between VPCs. 
    * If  
        VPC1 IP Range is 10.0.0.0/24 (From 10.0.0.0 to 10.0.0.255) and   
        VPC2 IP Range is 10.0.0.128/25 (From 10.0.0.128 to 10.0.0.255)  
        then it is not possible to do VPC Peering between VPC1 and VPC2.
    * If  
        VPC1 IP Range is 10.0.0.0/24 (From 10.0.0.0 to 10.0.0.255)and  
        VPC2 IP Range is 10.0.1.128/25 (From 10.0.1.128 to 10.0.1.255)  
        then it is possible to do VPC Peering between VPC1 and VPC2.
