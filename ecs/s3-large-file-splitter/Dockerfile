# Reference : https://gallery.ecr.aws/lambda/provided 
FROM public.ecr.aws/lambda/provided:al2.2024.10.15.11-x86_64

# Copy Bootstrap file
# Reference for Bootstrap https://docs.aws.amazon.com/lambda/latest/dg/runtimes-walkthrough.html
COPY bootstrap ${LAMBDA_RUNTIME_DIR}
RUN chmod 755 ${LAMBDA_RUNTIME_DIR}/bootstrap

# Copy the bash script file to Lambda Root 
COPY function.sh ${LAMBDA_TASK_ROOT}
RUN chmod 755 ${LAMBDA_TASK_ROOT}/function.sh

CMD [ "function.handler" ]
