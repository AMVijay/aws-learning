import { Context, Handler } from "aws-lambda";
import { ECSClient, ListTasksCommand, StartTaskCommand, StopTaskCommand, UpdateServiceCommand } from '@aws-sdk/client-ecs';

export const handler: Handler = async (event: any, context: Context) => {
    console.info("event", JSON.stringify(event));
    if (event && event.clusterName && event.regionName && event.action) {
        const tasks = await fetchTasks(event.clusterName, event.regionName);
        console.info("Tasks :: ", tasks);
        if (event.action === 'stop') {
            await stopTasks(tasks, event.clusterName);
        }
        else if (event.action === 'start') {
            for (const task in tasks) {
                await startTask(event.clusterName, event.serviceName, event.regionName);
            }
        }

    }
    else {
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

async function stopTasks(tasks: any, clusterName: string) {
    console.log("TaskArns to stop :: ", tasks);
    const client = new ECSClient();
    for (const taskArn of tasks) {
        console.log("taskArn :: ", taskArn);
        const taskId = taskArn.split("/")[2];
        console.log("Task Id :: ", taskId);
        const command = new StopTaskCommand({
            cluster: clusterName,
            task: taskId
        });
        const response = await client.send(command);
        console.log("stopTask response");
    }

}


async function startTask(clusterName: string, serviceName: string, regionName: string) {
    const client = new ECSClient({
        region: regionName
    });
    const command = new UpdateServiceCommand({
        cluster: clusterName,
        service: serviceName,
        desiredCount: 1

    });
    const response = await client.send(command);
    console.log("response");
}
