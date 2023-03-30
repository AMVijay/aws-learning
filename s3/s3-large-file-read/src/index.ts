import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

export const handler = async(event: any) => {
    console.log("Hello, World");

    const getObjectCommand = new GetObjectCommand({
        Bucket: "",
        Key: ""
    });

    try{
        const response = await client.send(getObjectCommand);
        const str = await response.Body?.transformToString();
        console.log("Bucket Content ", str);
    } catch(error){
        console.error("Error in getObject ", error);
    }
}