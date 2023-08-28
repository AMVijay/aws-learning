import { Callback, CloudFrontRequest, Context, Handler } from "aws-lambda";
import {InvokeCommand, InvokeCommandInput, LambdaClient} from "@aws-sdk/client-lambda";

/**
 * Lambda handler to authorize Cloudfront Request.
 * @param event 
 * @param context
 * @param callback 
 */
export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
    console.log("handler method execution");
    console.log("Event ", event);
    console.log("Event JSON ", JSON.stringify(event));
    if (checkCloudfrontRequestDetails(event)) {
        const request: CloudFrontRequest = event.Records[0].cf.request;
        // const authorizationStatus = await authorizeCloudfrontRequest(request);
        const authorizationStatus = true;
        console.log("authorizationStatus ", authorizationStatus);
        if (authorizationStatus) {
            callback(null, request);
        }
        else {
            const response = getUnauthorizedMessage();
            callback(null, response);
        }
    }
    else {
        // Send Unauthorized Response content
        const response = getUnauthorizedMessage();
        callback(null, response);
    }
}

function getUnauthorizedMessage() {
    return {
        statusCode: "401",
        statusDescription: "Unauthorized"
    }
}


function checkCloudfrontRequestDetails(event: any) {
    return event.Records
        && event.Records[0]
        && event.Records[0].cf
        && event.Records[0].cf.request
        ?
        true : false;
}

async function authorizeCloudfrontRequest(request: CloudFrontRequest) {

    const client = new LambdaClient({
        region: "us-east-1"
    });
    const input: InvokeCommandInput = {
        FunctionName: "<function name>",
        InvocationType: "RequestResponse",
        Payload: Buffer.from(JSON.stringify(request.headers),"utf8")
    } 

    const inputCommand = new InvokeCommand(input);
    const response = await client.send(inputCommand);
    console.log("response ", response);
    if(response.StatusCode == 200){
        return true;
    }
    return false;

}

