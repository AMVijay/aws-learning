/**
 * @author VIJAYaraaghavan Manoharan
 */

import https, { RequestOptions } from 'https';

export const handler = async () => {
    console.log("Hello, World");

    const url: string = process.env.ENDPOINT as string;

    console.log("Endpoint value is ", url);

    const options: RequestOptions = {
        method: "GET",
        headers: {
            "Content-Type": 'application/json'
        }
    }

    // Sending the request
    const response = await new Promise((resolve, reject) => {

        https.request(url, options, (res) => {
            console.log("sent request");
            let data = ''

            res.on('data', (chunk) => {
                data += chunk;
            });

            // Ending the response 
            res.on('end', () => {
                console.log('Body:', data)
            });

        }).on("error", (err) => {
            console.log("Error: ", err)
        }).end()

    });



    console.log("Request completed");

}