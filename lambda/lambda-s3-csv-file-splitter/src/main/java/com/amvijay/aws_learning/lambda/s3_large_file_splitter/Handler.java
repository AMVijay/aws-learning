package com.amvijay.aws_learning.lambda.s3_large_file_splitter;

import java.util.Map;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

public class Handler implements RequestHandler<Map<String, String>, String> {

    @Override
    public String handleRequest(Map<String, String> event, Context context) {
        LambdaLogger lambdaLogger = context.getLogger();
        lambdaLogger.log("Hello, World");

        S3Client s3Client = S3Client.builder().build();

        GetObjectRequest getObjectRequest = GetObjectRequest.builder().key("null").bucket("null").build();
        ResponseInputStream<GetObjectResponse> responseInputStream = s3Client.getObject(getObjectRequest);

        responseInputStream.read(null)
        

        return "Hello, World";
    }

}