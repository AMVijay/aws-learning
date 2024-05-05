FROM public.ecr.aws/shelf/lambda-libreoffice-base:7.6-node18-x86_64
RUN yum install java-17-amazon-corretto-headless -y 
RUN yum install libXinerama.x86_64 cups-libs dbus-glib cairo cups -y
COPY dist/index.js ${LAMBDA_TASK_ROOT}/
# COPY node_modules ${LAMBDA_TASK_ROOT}/
COPY test.docx /home/
COPY test.docx ${LAMBDA_TASK_ROOT}
RUN libreoffice7.6 --headless --convert-to pdf --outdir /tmp/ /home/test.docx
# CMD ["index.handler"]
CMD ["node","index.js"]