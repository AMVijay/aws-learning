import {QueryCommand} from "@aws-sdk/client-dynamodb";

export const handler = async() => {
    console.log("Hello, World");

    const queryCommand = new QueryCommand({
        TableName: "",
        
    });
}