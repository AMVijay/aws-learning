import { Context, Handler } from "aws-lambda";
import { ECSClient, ListTasksCommand } from '@aws-sdk/client-ecs';

export const handler: Handler = async (event: any, context: Context) => {
    console.info("event", JSON.stringify(event));
    if(event && event.clusterName && event.regionName){
        const tasks = await fetchTasks(event.clusterName, event.regionName);
        console.info("Tasks :: ", tasks);
    }
    else{
        return "Invalid Input";
    }
    
}

async function fetchTasks(clusterName: string, regionName: string) {
    console.log("FetchTasks for Cluster Name :: ", clusterName);
    const client = new ECSClient({
        region: regionName
    });
    const command = new ListTasksCommand({
        cluster: clusterName
    });
    const response = await client.send(command);
    console.log("response :: ", response);
    return response.taskArns;
}