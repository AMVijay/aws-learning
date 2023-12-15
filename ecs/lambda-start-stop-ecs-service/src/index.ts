import { Context, Handler } from "aws-lambda";
import { ECSClient, ListTasksCommand } from '@aws-sdk/client-ecs';

export const handler: Handler = async (event: any, context: Context) => {
    console.info("event", JSON.stringify(event));
    const tasks = fetchTasks(event.clusterName);
    console.info("Tasks :: ", tasks);
}

async function fetchTasks(clusterName: string) {

    const client = new ECSClient();

    const command = new ListTasksCommand({
        cluster: clusterName
    });

    const response = await client.send(command);
    console.log("response :: ", response);
    return response;
}