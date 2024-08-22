import { AssumeRoleCommand, Credentials, STSClient } from '@aws-sdk/client-sts';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { defaultProvider } from '@aws-sdk/credential-provider-node';

const REGION = "us-west-2";
const HOSTNAME: string = process.env.HOSTNAME as string;
const ENDPOINT: string = process.env.APPSYNC_URI as string;
const X_API_KEY: string = process.env.X_API_KEY as string;

export const handler = async () => {
    console.log("Hello, World");

    const payload = {
        "query": `{
            getConfig(configName: "TEST"){
                items{
                    configName
                    value
                }
            }
        }`
    }

    console.log("Payload", JSON.stringify(payload));
    console.log("X_API_KEY", X_API_KEY);

    const apiUrl = new URL(ENDPOINT);

    const request = new HttpRequest({
        method: "POST",
        hostname: apiUrl.host,
        path: apiUrl.pathname,
        protocol: apiUrl.protocol,
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/graphql',
            host: apiUrl.host,
            'x-appsync-domain': HOSTNAME,
        }
    });

    const signedRequest = await getSignedRequest(request);

    // const stsResponse = await getSTSFromAnotherAWSAccount();
    // console.log("handler > STS Response ", stsResponse);
    // const signedRequest = await getSignedRequest(stsResponse?.Credentials as Credentials, payload);

    await fetch(ENDPOINT, signedRequest)
        .then(response => response.json())
        .then(data => {
            console.log('Here is the data: ', data);
        });

    // const request: RequestInit = {
    //     method: 'POST',
    //     body: JSON.stringify(payload),
    //     headers: {
    //         'Content-Type': 'application/graphql',
    //         Host: HOSTNAME,
    //         'x-appsync-domain': HOSTNAME,
    //         "x-api-key": X_API_KEY
    //     },
    // }

    // await fetch(ENDPOINT, request)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('AppSync response data: ', data);
    //     });



    console.log("handler completed");
}

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
async function getSignedRequest(request: HttpRequest) {

    const sigv4 = new SignatureV4({
        service: 'appsync',
        region: REGION,
        credentials: defaultProvider(),
        sha256: Sha256
    });

    const signed = await sigv4.sign(request);
    return signed;

}
/**
 * Get Signed Input data for REST API call.
 * @param credentials
 * @returns 
 */
async function getSignedRequest1(credentials: Credentials, payload: any) {

    const sigv4 = new SignatureV4({
        service: 'appsync',
        region: REGION,
        credentials: {
            accessKeyId: credentials.AccessKeyId as string,
            secretAccessKey: credentials.SecretAccessKey as string,
            sessionToken: credentials.SessionToken as string
        },
        sha256: Sha256
    });

    const apiUrl = new URL(ENDPOINT);

    const signed = await sigv4.sign({
        method: "POST",
        hostname: apiUrl.host,
        path: apiUrl.pathname,
        protocol: apiUrl.protocol,
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/graphql',
            'host': apiUrl.host,
            'x-appsync-domain': HOSTNAME,
        }

    });
    return signed;

}