import { Context, Handler } from "aws-lambda";
import { ECSClient, ListTasksCommand, StartTaskCommand, StopTaskCommand } from '@aws-sdk/client-ecs';

export const handler: Handler = async (event: any, context: Context) => {
    console.info("event", JSON.stringify(event));
    if(event && event.clusterName && event.regionName && event.action){
        const tasks = await fetchTasks(event.clusterName, event.regionName);
        console.info("Tasks :: ", tasks);
        if(event.action === 'stop'){
            for(const task in tasks){
                await stopTask(task);
            }
        }
        else if(event.action === 'start'){
            for(const task in tasks){
                await startTask(task);
            } 
        }
        
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

async function stopTask(taskArn: string) {
    const client = new ECSClient();
    const command = new StopTaskCommand({
        task: taskArn
    });
    const response = await client.send(command);
    console.log("stopTask response");
}


async function startTask(taskArn: string) {
    const client = new ECSClient();
    // const command = new StartTaskCommand({

    // });
    // const response = await client.send(command);
    console.log("response");
}
