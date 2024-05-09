FROM public.ecr.aws/shelf/lambda-libreoffice-base:7.6-node18-x86_64
RUN yum install java-17-amazon-corretto-headless -y 
RUN yum install libXinerama.x86_64 cups-libs dbus-glib cairo cups -y
COPY dist/converWordtoPdf.js ${LAMBDA_TASK_ROOT}/
# COPY node_modules ${LAMBDA_TASK_ROOT}/
COPY test.docx /home/
COPY convert-word-to-pdf.sh ${LAMBDA_TASK_ROOT}
RUN chmod 777 ${LAMBDA_TASK_ROOT}/convert-word-to-pdf.sh
CMD ["converWordtoPdf.handler"]