# AWS Data Storage Service - Understanding

AWS covers various storage service options. 
* [S3](#s3)
* [EFS](#efs)
* [EBS](#ebs)

## S3
* S3 - It is called Simple Storage Service.
* It is object storage services. It means data stored as object.
* Minimum object size can be 0 byte, Maximum object size can be 5 TB.
* Other points for design to persist/upload: 
    * Max 5 GB can be uploaded in single PUT request. 
    * If object size is more than 100 MB, then need to consider multipart upload. 
* S3 has different type service based on cost, resiliency, performance.
    * S3 Standard
    * S3 Infrequent Access
    * S3 One Available Zone 
    * S3 Glacier
    * S3 Glacier Deep Archive

## EFS 
* EFS - Elastic File Storage.
* It is typical file storage service used as Network File Storage (SAN).
* It can be attached in EC2, ECS.

## EBS 
* EBS - Elastic Block Storage.
* It is high performance storage similar to SSD used in local computer.
* It can be attached to EC2, ECS.
