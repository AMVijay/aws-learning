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
        writeFileSync(`/tmp/${inputFile}`, await response.Body.transformToByteArray());
    } catch (error) {
        console.error("Error in getObject ", error);
    }

    writeFileSync('/tmp/hello.txt', Buffer.from('Hello World!'));
    // execSync('cd /tmp/');
    execSync('libreoffice7.6 --headless --convert-to pdf --outdir /tmp/ /tmp/test.docx');
    execSync('libreoffice7.6 --version >> /tmp/output.txt');
    readdirSync('/tmp/').forEach(file => {
        console.log("/tmp/ content ", file);
    });
    const outputTxt = readFileSync('/tmp/output.txt', { encoding: 'utf-8', flag: 'r' });
    console.log("outputTxt :: ", outputTxt);
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

    // console.log("logs", logs);
    readdirSync('/var/task/').forEach(file => {
        console.log("/var/task/ content ", file);
    });

    readdirSync('/home/').forEach(file => {
        console.log("home folder content ", file);
    });
    const fileContent = readFileSync('/tmp/output.txt');

    const putObjectCommand = new PutObjectCommand({
        Bucket: s3Bucket,
        Key: 'output.txt',
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