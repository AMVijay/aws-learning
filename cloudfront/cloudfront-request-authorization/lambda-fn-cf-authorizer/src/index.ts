import { Callback, Context, Handler } from "aws-lambda";

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
    console.log("handler method execution");
}