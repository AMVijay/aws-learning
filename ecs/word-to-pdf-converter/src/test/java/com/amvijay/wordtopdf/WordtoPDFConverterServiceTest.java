

package com.amvijay.wordtopdf;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

import com.amvijay.wordtopdf.service.WordtoPDFConverterService;


/**
 * Unit test for simple App.
 */
public class WordtoPDFConverterServiceTest {

    @Test
    public void testWordToPDFConvert(){
        WordtoPDFConverterService service = new WordtoPDFConverterService();
        service.convert("document name");
        assertTrue(true);
    }
}
