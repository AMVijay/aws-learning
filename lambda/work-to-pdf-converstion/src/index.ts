import { exec, execSync } from 'child_process';
import { writeFileSync } from 'fs'

export const DEFAULT_ARGS = [
    '--headless',
    '--invisible',
    '--nodefault',
    '--view',
    '--nolockcheck',
    '--nologo',
    '--norestore',
];

export const handler = async () => {
    console.log("Hello, World");
    writeFileSync('/tmp/hello.txt', Buffer.from("Hello, World"));
    console.log("hello.txt created");
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
    console.log("complete PDF Conversion");
}
