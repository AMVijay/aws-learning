package com.amvijay.wordtopdf.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

public class S3Service {

    public void downloadFile(String bucket, String file) {

        try {
            S3Client s3Client = S3Client.builder().build();
            GetObjectRequest getObjectRequest = GetObjectRequest.builder().bucket(bucket).key(file).build();
            
            ResponseInputStream<GetObjectResponse> response = s3Client.getObject(getObjectRequest);
            FileOutputStream fileOutputStream = new FileOutputStream(file);
            int content;
            while ((content = response.read()) != -1) {
                fileOutputStream.write(content);
            }
            fileOutputStream.close();
            response.close();
            System.out.println("S3 Download completed. " +  file);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            System.err.println(e);
        }
    }

    public void upload(String bucket, String file) {
        S3Client s3Client = S3Client.builder().build();
        PutObjectRequest putObjectRequest = PutObjectRequest.builder().bucket(bucket).key(file).build();
        s3Client.putObject(putObjectRequest, Paths.get(file));
    }

}
