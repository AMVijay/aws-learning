# Word to PDF conversion

Using custom docker image.

1. Compile code using `npm run build`
2. docker build 
3. docker push to ECR
4. Create Lambda function from ECR image.