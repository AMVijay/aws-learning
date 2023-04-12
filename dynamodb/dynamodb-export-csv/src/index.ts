import { QueryCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {unmarshall} from '@aws-sdk/util-dynamodb';

export const handler = async () => {
    console.log("Hello, World");

    try {
        const ddbClient = new DynamoDBClient({ region: process.env.REGION });

        const queryCommand = new QueryCommand({
            TableName: process.env.TABLE_NAME,
            // IndexName: process.env.INDEX_NAME,
            KeyConditionExpression: process.env.KEY_CONDITION,
            ExpressionAttributeValues: {
                ":param1": { S: "<value>" }
            }
        });

        const result = await ddbClient.send(queryCommand);
        result.Items?.forEach(element => {
            console.log("element", unmarshall(element));
        });

    } catch (error) {
        console.error("Error in DynamoDB Query", error);
    }

    console.log("Completed process");
}