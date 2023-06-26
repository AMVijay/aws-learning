/**
 * @author VIJAYaraaghavan Manoharan
 */

import https, { RequestOptions } from 'https';
import { AssumeRoleCommand, Credentials, STSClient } from '@aws-sdk/client-sts';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { HttpRequest } from '@aws-sdk/types';

export const handler = async () => {
    console.log("async handler started");
    const stsResponse = await getStsData();
    console.log("handler > STS Response ", stsResponse);
    const signedRequest = await getSignedRequest(stsResponse?.Credentials as Credentials);
    console.log("handler > SignedRequestData ", signedRequest);
    const response = await getRestAPIResponse(signedRequest);
    console.log("handler > API Response value ", response);
    console.log("async handler stopped");
    return response;
}

/**
 * Method to invoke RESTAPI and get response.
 */
function getRestAPIResponse(signedRequestData: HttpRequest) {

    const url: string = process.env.ENDPOINT as string;

    console.log("Endpoint value is ", url);

    const options: RequestOptions = {
        method: "GET",
        headers: {
            "Content-Type": 'application/json'
        }
    }

    // Sending the request
    return new Promise((resolve, reject) => {

        https.request(url, signedRequestData, (res) => {
            console.log("sent request");
            let data = ''

            res.on('data', (chunk) => {
                data += chunk;
            });

            // Ending the response 
            res.on('end', () => {
                console.log('Body:', data);
            });

        }).on("error", (err) => {
            console.log("Error: ", err)
        }).end()

    });

}

async function getStsData() {
    try {

        const REGION = "us-west-2";
        const client = new STSClient({ region: REGION });

        const command = new AssumeRoleCommand({
            RoleArn: process.env.ROLE_ARN, // Role from destination account
            RoleSessionName: "session1",
            DurationSeconds: 900
        });

        const response = await client.send(command);
        console.log("STS response", response);
        return response;
    } catch (error) {
        console.error("error occurred in getstsData", error);
    }
}
async function getSignedRequest(credentials: Credentials) {

    const sigv4 = new SignatureV4({
        service: 'execute-api',
        region: 'us-west-2',
        credentials: {
            accessKeyId: credentials.AccessKeyId as string,
            secretAccessKey: credentials.SecretAccessKey as string,
            sessionToken: credentials.SessionToken as string
        },
        sha256: Sha256
    });

    const apiUrl = new URL(process.env.ENDPOINT as string)

    const signed = await sigv4.sign({
        method: 'GET',
        hostname: apiUrl.host,
        path: apiUrl.pathname,
        protocol: apiUrl.protocol,
        headers: {
            'Content-Type': 'application/json',
            host: apiUrl.hostname, // compulsory
        },
    });
    return signed;

}

