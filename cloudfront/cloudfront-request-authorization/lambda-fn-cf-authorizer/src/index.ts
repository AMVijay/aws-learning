import { Callback, CloudFrontRequest, Context, Handler } from "aws-lambda";

/**
 * Lambda handler to authorize Cloudfront Request.
 * @param event 
 * @param context
 * @param callback 
 */
export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
    console.log("handler method execution");
    if (checkCloudfrontRequestDetails(event)) {
        const request: CloudFrontRequest = event.Records[0].cf.request;
        if (authorizeCloudfrontRequest(request)) {
            callback(null, request);
        }
        else {
            callback(null, getUnauthorizedMessage());
        }
    }
    else {
        // Send Unauthorized Response content
        callback(null, getUnauthorizedMessage);
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

