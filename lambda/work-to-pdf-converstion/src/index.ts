import { execSync } from 'child_process';
import { writeFileSync } from 'fs'

export const handler = async () => {
    console.log("Hello, World");
    writeFileSync('/tmp/hello.txt', Buffer.from("Hello, World"));
    execSync(`
        cd /tmp
        libreoffice7.6 --headless --invisible --nodefault --view --nolockcheck --nologo --norestore --convert-to pdf --outdir /tmp ./hello.txt
    `);
    console.log("complete PDF Conversion");
}
