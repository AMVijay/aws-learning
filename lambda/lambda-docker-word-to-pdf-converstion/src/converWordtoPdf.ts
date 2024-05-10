
import { execSync } from 'child_process';
import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const DEFAULT_ARGS = [
    '--headless',
    '--invisible',
    '--nodefault',
    '--view',
    '--nolockcheck',
    '--nologo',
    '--norestore',
];
const client = new S3Client({});

export const handler = async () => {
    console.log("Word to PDF Conversion starts");
    const s3Bucket = process.env.S3_BUCKET;
    const inputFile = process.env.inputFile;

    // Get Word document from S3
    const getObjectCommand = new GetObjectCommand({
        Bucket: s3Bucket,
        Key: inputFile
    });

    try {
        const response = await client.send(getObjectCommand);
        const data = await response.Body?.transformToByteArray();
        if (data !== undefined) {
            writeFileSync(`/tmp/${inputFile}`, data);
        }
    } catch (error) {
        console.error("Error in getObject ", error);
    }

    // Convert the word to PDF 
    execSync(`libreoffice7.6 --headless --convert-to pdf --outdir /tmp/ /tmp/${inputFile} >> /tmp/conversion.txt`,{ encoding: 'utf-8'});
    readdirSync('/tmp/').forEach(file => {
        console.log("/tmp/ content after PDF ", file);
    });

    const conversionTxt = readFileSync('/tmp/conversion.txt', { encoding: 'utf-8', flag: 'r' });
    console.log("conversion :: ", conversionTxt);

    // Derive PDF File Name 
    const pdfFile = inputFile?.split(".")[0] + ".pdf";
    console.log("pdfFile :: ", pdfFile);

    // Write PDF file back to S3
    const fileContent = readFileSync(`/tmp/${pdfFile}`);

    const putObjectCommand = new PutObjectCommand({
        Bucket: s3Bucket,
        Key: pdfFile,
        Body: fileContent
    });

    try {
        const response = await client.send(putObjectCommand);
        console.log("response ", response);
    } catch (error) {
        console.error("Error in putObject ", error);
    }

    console.log("Word to PDF Conversion Completed");
}