/**
 * @author VIJAYaraaghavan Manoharan
 */

import { RequestOptions, request } from 'https';

export const handler = async () => {
    console.log("Hello, World");
    console.log("Endpoint value is ", process.env.ENDPOINT);

    const url: string = process.env.ENDPOINT as string;

    // Setting the configuration for
    // the request
    const options: RequestOptions = {
        method: 'GET'
    };

    // Sending the request
    const req = request(url, options, (res) => {
        let data = ''

        res.on('data', (chunk) => {
            data += chunk;
        });

        // Ending the response 
        res.on('end', () => {
            console.log('Body:', JSON.parse(data))
        });

    }).on("error", (err) => {
        console.log("Error: ", err)
    }).end()

}