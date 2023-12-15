import { Context, Handler } from "aws-lambda";

export const handler: Handler = async(event: any, context: Context) => {
    console.info("event", JSON.stringify(event));
    const tasks = fetchTasks(event.clusterName);
    console.info("Tasks :: ", tasks);
}

function fetchTasks(){

    
}