import { Context } from "aws-lambda";

export const manageECS = async(event: any, context: Context) => {
    console.info("event", JSON.stringify(event));
}