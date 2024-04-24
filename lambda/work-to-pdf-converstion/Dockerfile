FROM public.ecr.aws/shelf/lambda-libreoffice-base:7.6-node18-x86_64
RUN yum install java-1.8.0-openjdk-devel -y
COPY dist/index.js ${LAMBDA_TASK_ROOT}/
COPY test.docx /tmp
CMD ["index.handler"]