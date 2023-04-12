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
        let csv = "";
        let header = false;
        result.Items?.forEach(element => {
            if(!header){
                csv = Object.keys(unmarshall(element)).join(",");
                csv += "\n";
                header = true;
            }
            csv += Object.values(unmarshall(element)).join(",");
            csv += "\n";
        });
        console.log("CSV Content", csv);
        

    } catch (error) {
        console.error("Error in DynamoDB Query", error);
    }

    console.log("Completed process");
}