package com.amvijay.aws_learning.lambda.s3_large_file_splitter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.logging.LogLevel;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

public class Handler implements RequestHandler<Map<String, String>, String> {

    @Override
    public String handleRequest(Map<String, String> event, Context context) {
        LambdaLogger lambdaLogger = context.getLogger();
        lambdaLogger.log("Hello, World");
        String bucketName = event.get("BUCKET_NAME");
        lambdaLogger.log("BUCKET NAME " + bucketName);
        String inputFileName = event.get("FILE_NAME");
        lambdaLogger.log("File Name " + inputFileName);
        
        S3Client s3Client = S3Client.builder().build();

        GetObjectRequest getObjectRequest = GetObjectRequest.builder().key(inputFileName).bucket(bucketName).build();
        ResponseInputStream<GetObjectResponse> responseInputStream = s3Client.getObject(getObjectRequest);

        try {
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(responseInputStream));
            int linesCount = 0;
            int splitCount = 1;
            StringBuffer stringBuffer = new StringBuffer();
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                if (linesCount < 1000) {
                    if(linesCount > 0){
                        stringBuffer.append(System.lineSeparator());
                    }
                    stringBuffer.append(line);
                    linesCount++;
                }else{
                    lambdaLogger.log(stringBuffer.toString());
                    linesCount = 0;
                    PutObjectRequest putObjectRequest = PutObjectRequest.builder().bucket(bucketName).key(splitCount++ +".csv").build();
                    s3Client.putObject(putObjectRequest, RequestBody.fromString(stringBuffer.toString()));
                    stringBuffer = new StringBuffer();
                }
                
            }
        } catch (IOException e) {
            lambdaLogger.log(e.getMessage(), LogLevel.ERROR);
        }

        return "Hello, World";
    }

}