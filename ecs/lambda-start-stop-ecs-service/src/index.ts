import { Context, Handler } from "aws-lambda";
import { ECSClient, ListTasksCommand } from '@aws-sdk/client-ecs';

export const handler: Handler = async (event: any, context: Context) => {
    console.info("event", JSON.stringify(event));
    const tasks = await fetchTasks(event.clusterName);
    console.info("Tasks :: ", tasks);
}

async function fetchTasks(clusterName: string) {
    console.log("FetchTasks for Cluster Name :: ", clusterName);
    const client = new ECSClient({
        region: "us-west-2"
    });
    const command = new ListTasksCommand({
        cluster: clusterName
    });
    const response = await client.send(command);
    console.log("response :: ", response);
    return response;
}