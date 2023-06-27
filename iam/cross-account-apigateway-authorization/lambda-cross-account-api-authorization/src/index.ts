/**
 * @author VIJAYaraaghavan Manoharan
 * POC to access Rest API hosted in AWS Account A from Lambda hosted in AWS Account B.
 * Cross Account API Access with AWS IAM authorization. 
 */

import https, { RequestOptions } from 'https';
import { AssumeRoleCommand, Credentials, STSClient } from '@aws-sdk/client-sts';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { HttpRequest } from '@aws-sdk/types';

/**
 * Lambda handler
 * @returns 
 */
export const handler = async () => {
    console.log("async handler started");
    const stsResponse = await getSTSFromAnotherAWSAccount();
    console.log("handler > STS Response ", stsResponse);
    const signedRequest = await getSignedRequest(stsResponse?.Credentials as Credentials);
    console.log("handler > SignedRequestData ", signedRequest);
    const response = await getRestAPIResponse(signedRequest);
    console.log("handler > API Response value ", response);
    console.log("async handler stopped");
    return response;
}

const REGION = "us-west-2";

/**
 * Get AWS secure access tokens from STS
 * @returns 
 */
async function getSTSFromAnotherAWSAccount() {
    try {

        const client = new STSClient({ region: REGION });

        const command = new AssumeRoleCommand({
            RoleArn: process.env.ROLE_ARN, // Role from destination account
            RoleSessionName: "session1",
            DurationSeconds: 900
        });

        const response = await client.send(command);
        return response;
    } catch (error) {
        console.error("error occurred in getstsData", error);
    }
}

/**
 * Get Signed Input data for REST API call.
 * @param credentials
 * @returns 
 */
async function getSignedRequest(credentials: Credentials) {

    const sigv4 = new SignatureV4({
        service: 'execute-api',
        region: REGION,
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
            host: apiUrl.hostname, // mandatory
        },
    });
    return signed;

}

/**
 * Method to invoke RESTAPI and get response.
 */
async function getRestAPIResponse(signedRequestData: HttpRequest) {

    const url: string = process.env.ENDPOINT as string;

    console.log("Endpoint value is ", url);

    // const options: RequestOptions = {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": 'application/json'
    //     }
    // }

    // Sending the request
    const response = new Promise((resolve, reject) => {

        https.request(url, signedRequestData, (res) => {
            let data = ''

            res.on('data', (chunk) => {
                data += chunk;
            });

            // Ending the response 
            res.on('end', () => {
                resolve(JSON.parse(data));
            });

        }).on("error", (err) => {
            console.error("Error: ", err)
            reject(err);
        }).end()

    });

    return await response

}




