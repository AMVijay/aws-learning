import {QueryCommand, DynamoDBClient} from "@aws-sdk/client-dynamodb";

export const handler = async() => {
    console.log("Hello, World");

    try{
        const ddbClient = new DynamoDBClient({region: "US-WEST-2"});

        const queryCommand = new QueryCommand({
            TableName: "",
            IndexName: "",
            KeyConditionExpression: ""
        });

        const result = await ddbClient.send(queryCommand);
        result.Items?.forEach(element => {
            console.log("element", element);
        });
    } catch(error){
        console.error("Error in DynamoDB Query", error);
    }


}