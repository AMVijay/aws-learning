/**
 * @author VIJAYaraaghavan Manoharan
 */

import {get} from 'https';

export const handler = async() => {
    console.log("Hello, World");
    console.log("Endpoint value is ", process.env.ENDPOINT );

    const url: string = process.env.ENDPOINT as string;

    get(url, (res) => {
        console.log("Response from client is ", res);
    });
}