import { Callback, CloudFrontRequest, Context, Handler } from "aws-lambda";

/**
 * Lambda handler to authorize Cloudfront Request.
 * @param event 
 * @param context
 * @param callback 
 */
export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
    console.log("handler method execution");
    console.log("Event ", event);
    if (checkCloudfrontRequestDetails(event)) {
        const request: CloudFrontRequest = event.Records[0].cf.request;
        if (authorizeCloudfrontRequest(request)) {
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

function authorizeCloudfrontRequest(request: CloudFrontRequest) {
    return false;
}

