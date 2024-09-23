package com.amvijay.aws_learning.lambda.s3_large_file_splitter;

import java.util.Map;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class Handler implements RequestHandler<Map<String, String>, String> {

    @Override
    public String handleRequest(Map<String, String> event, Context context) {
        LambdaLogger lambdaLogger = context.getLogger();
        lambdaLogger.log("Hello, World");
        return "Hello, World";
    }

}