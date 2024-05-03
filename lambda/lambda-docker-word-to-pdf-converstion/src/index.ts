import { exec, execSync, spawn } from 'child_process';
import { createWriteStream, readFileSync, readdirSync, writeFile, writeFileSync } from 'fs'
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

    readdirSync('/tmp/').forEach(file => {
        console.log("/tmp/ content before PDF", file);
    });

    writeFileSync('/tmp/hello.txt', Buffer.from('Hello World!'));
    // execSync('cd /tmp/');
    execSync(`libreoffice7.6 --version >> /tmp/version.txt`);
    const version = readFileSync('/tmp/version.txt', { encoding: 'utf-8', flag: 'r' });
    console.log("version :: ", version);
    
    execSync(`libreoffice7.6 --headless --convert-to pdf --outdir /tmp/ /tmp/${inputFile} >> /tmp/conversion.txt`);
    readdirSync('/tmp/').forEach(file => {
        console.log("/tmp/ content after PDF ", file);
    });

    const conversionTxt = readFileSync('/tmp/conversion.txt', { encoding: 'utf-8', flag: 'r' });
    console.log("conversion :: ", conversionTxt);
    
    let logs;
    const LO_BINARY_PATH = 'libreoffice7.6';
    const argumentsString = DEFAULT_ARGS.join(' ');
    // const cmd = `cd /home/ && ${LO_BINARY_PATH} ${argumentsString} --convert-to pdf --outdir /home/ /home/test.docx`;
    // due to an unknown issue, we need to run command twice
    // try {
    //     // let output = execSync(cmd).toString();
    //     // console.log("output ", output);
    //     const { stdout, stderr } = await exec(cmd);
    //     console.log('stdout:', stdout);
    //     console.error('stderr:', stderr);
    // } catch (e) {
    //     logs = await exec(cmd).stdout;
    // }

    const pdfFile = inputFile?.split(".") + ".pdf";
    console.log("pdfFile :: ", pdfFile);

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

    const ls = spawn('ls', ['-lh', '/var']);

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
    });

    ls.on('exit', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    console.log("Word to PDF Conversion Completed");
}
