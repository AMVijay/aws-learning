package com.amvijay.wordtopdf;

import com.amvijay.wordtopdf.service.S3Service;
import com.amvijay.wordtopdf.service.WordtoPDFConverterService;

/**
 * Hello world!
 */
public class App {

    public void convertWordtoPDF(String bucketName, String file) {

        S3Service s3Service = new S3Service();
        s3Service.downloadFile(bucketName, file);
        WordtoPDFConverterService wordtoPDFConverterService = new WordtoPDFConverterService();
        wordtoPDFConverterService.convert(file);
        s3Service.upload(bucketName, file.replace("docx", "pdf"));
    }

    private String deriveFileName(String file) {
        String[] parsedArray = file.split("\\.docx")[0].split("/");
        return parsedArray[parsedArray.length-1];
    }
}
