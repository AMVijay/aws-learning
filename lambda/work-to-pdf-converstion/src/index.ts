import { exec, execSync } from 'child_process';
import { readFileSync } from 'fs'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

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
    // const getObjectCommand = new GetObjectCommand({
    //     Bucket: s3Bucket,
    //     Key: inputFile
    // });

    // try{
    //     const response = await client.send(getObjectCommand);
    //     const str = await response.Body?.transformToString();
    // } catch(error){
    //     console.error("Error in getObject ", error);
    // }

    // execSync(`cd /tmp`);
    // execSync(`libreoffice7.6 --headless --invisible --nodefault --view --nolockcheck --nologo --norestore --convert-to pdf --outdir /tmp /tmp/test.docx`);
    let logs;
    const LO_BINARY_PATH = 'libreoffice7.6';
    const argumentsString = DEFAULT_ARGS.join(' ');
    const cmd = `cd /tmp && ${LO_BINARY_PATH} ${argumentsString} --convert-to pdf --outdir /tmp '/tmp/test.docx'`;
    // due to an unknown issue, we need to run command twice
    try {
        logs = (await exec(cmd)).stdout;
    } catch (e) {
        logs = (await exec(cmd)).stdout;
    }
    console.log("logs", logs);

    const fileContent = readFileSync("/tmp/test.pdf");

    const putObjectCommand = new PutObjectCommand({
        Bucket: s3Bucket,
        Key: 'test.pdf',
        Body: fileContent
    });

    try{
        const response = await client.send(putObjectCommand);
        console.log("response ", response);
    } catch(error){
        console.error("Error in putObject ", error);
    }

    console.log("Word to PDF Conversion Completed");
}
