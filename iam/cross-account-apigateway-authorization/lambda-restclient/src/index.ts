/**
 * @author VIJAYaraaghavan Manoharan
 */

import https, { RequestOptions } from 'https';

export const handler = async () => {
    console.log("async handler started");
    const response = await getRestAPIResponse();
    console.log("API Response value ", response);
    console.log("async handler stopped");
    return response;
}

/**
 * Method to invoke RESTAPI and get response.
 */
async function getRestAPIResponse(){

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

        https.request(url, options, (res) => {
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