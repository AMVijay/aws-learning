# Word to PDF conversion

Using custom docker image.

## Local Build and Validation with HelloWorld
1. Compile code using `npm run build`
2. Create Docker image `docker build -t wordtopdf -f Dockerfile.helloworld .`  
3. Run the docker image locally `docker run -p 9000:8080 wordtopdf:latest`
4. Invoke Lambda functions using `curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"payload":"hello world!"}'`


## Install LibreOffice in AWS Cloudshell
* Download LibreOffice from 
* Extract the installable using `tar -xvf LibreOffice`
* Navigate to RPMS folder `cd LibreOffice_7.6.5.2_Linux_x86-64_rpm/RPMS`
* Install local `sudo yum localinstall -y *.rpm --skip-broken`
* Install other dependency `sudo yum install -y cairo cups libXinerama.x86_64 cups-libs dbus-glib`
* Install Java `sudo yum install java-17-amazon-corretto-headless -y `
* Set path `export PATH=$PATH:/opt/libreoffice7.6/program`
* Now run `libreoffice7.6 --version`