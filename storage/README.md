# AWS Storage Analysis

Three types of storage available in AWS. 
1. Object Storage
2. Block Storage
3. File Storage

## Object Storage
* AWS S3 - Simple Storage Service. 
* AWS Glacier.  

## Block Storage
### EBS - Elastic Block Storage.
* Low Latency.
* Used in EC2. 
* Best fit to use in batch processing which requires high IO through put support. 

### EC2 Instance Store
* Ephermal Storage
* Typically used in EC2 for caching temp files for better performance.

## File Storage
### EFS - Elastic File Storage
* NFS (Network File System) protocol is used. 
* NFS is native to Unix and Linux.  
* Can be mounted in EC2, ECS, EKS.

### FSx 
* SMB (Server Message Block) protocol used. 
SMB is native to Windows.