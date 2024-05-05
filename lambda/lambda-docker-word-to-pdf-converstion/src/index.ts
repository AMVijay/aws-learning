import { execSync } from 'child_process';
import { readFileSync, readdirSync, writeFileSync } from 'fs'

export const handler = async () => {
    console.log("Word to PDF Conversion starts");
    writeFileSync('/tmp/hello.txt', Buffer.from('Hello World!'));
    readdirSync('/tmp/').forEach(file => {
        console.log("/tmp/ content before PDF", file);
    });
    execSync(`libreoffice7.6 --version >> /tmp/version.txt`);
    const version = readFileSync('/tmp/version.txt', { encoding: 'utf-8', flag: 'r' });
    console.log("version :: ", version);
    try {
        execSync(`libreoffice7.6 --headless --convert-to pdf --outdir /tmp/ /tmp/hello.txt >> /tmp/conversion.txt`);
    } catch (err) {
        console.log("Error in PDF conversion, retrying again", err);
        execSync(`libreoffice7.6 --headless --convert-to pdf --outdir /tmp/ /tmp/hello.txt >> /tmp/conversion.txt`);
    }
    execSync(`libreoffice7.6 --headless --convert-to pdf --outdir /tmp/ /tmp/hello.txt >> /tmp/conversion.txt`);
    readdirSync('/tmp/').forEach(file => {
        console.log("/tmp/ content after PDF ", file);
    });
    const conversion = readFileSync('/tmp/conversion.txt', { encoding: 'utf-8', flag: 'r' });
    console.log("conversion output :: ", conversion);
    console.log("Word to PDF Conversion Ends");
}


