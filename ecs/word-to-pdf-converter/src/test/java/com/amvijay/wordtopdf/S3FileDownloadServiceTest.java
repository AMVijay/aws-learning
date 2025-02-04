package com.amvijay.wordtopdf;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.amvijay.wordtopdf.service.S3Service;

public class S3FileDownloadServiceTest {

    @BeforeEach
    public void setup() {
    }

    @Test
    public void testAction() {
        S3Service service = new S3Service();
        service.downloadFile("<<bucket name>>", "key");
    }

}
