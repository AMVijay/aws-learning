# S3 Large File Splitter using AWS Lambda with Custom Image having Bash Script

## Execution Step
* Build the image as `docker buildx build --tag s3-large-file-splitter .`
* Run the image as `docker run -p 9000:8080 s3-large-file-splitter:latest`
* Test the lambda as `curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"payload":"hello world!"}'`
* To bash to this container `docker run --rm -it --entrypoint bash s3-large-file-splitter:latest`