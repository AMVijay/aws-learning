package com.amvijay.wordtopdf;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Unit test for simple App.
 */
public class AppTest {

    @BeforeEach
    public void setup() {
    }

    @Test
    public void testWordToPDFConvert(){
        App app = new App();
        app.convertWordtoPDF("<<s3 bucket name>>", "<<key>>");
        assertTrue(true);
    }

    @Test
    public void extractFileName(){
        String input = "folder/sample.docx";
        String[] parsedArray = input.split("\\.docx")[0].split("/");
        String fileName = parsedArray[parsedArray.length-1];
        System.out.println("File Name :: " + fileName);
        assertTrue(true);
    }
}
