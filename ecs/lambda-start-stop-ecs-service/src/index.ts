import { Context, Handler } from "aws-lambda";
import { ECSClient, ListClustersCommand, ListServicesCommand, ListTasksCommand, StartTaskCommand, StopTaskCommand, UpdateServiceCommand } from '@aws-sdk/client-ecs';

export const handler: Handler = async (event: any, context: Context) => {
    console.info("event", JSON.stringify(event));
    if (event && event.dr) {
        const regionName = "us-west-2";
        const clusters = await fetchClusters(regionName);
        if (clusters) {
            console.info("Clusters :: ", clusters);
            for (const clusterArn of clusters) {
                const services = await fetchServices(clusterArn,regionName);
                if(services){
                    console.log("Services :: ", services);
                    for(const serviceArn of services){
                        await updateService(clusterArn, serviceArn,regionName, event.dr === 'true' ? 1: 0);
                    }
                }
            }
        }

    }
    else {
        return "Invalid Input";
    }

}

async function updateService(clusterName: string, serviceName: string, regionName: string, taskCount: number) {
    const client = new ECSClient({
        region: regionName
    });
    const command = new UpdateServiceCommand({
        cluster: clusterName,
        service: serviceName,
        desiredCount: taskCount

    });
    const response = await client.send(command);
    console.log("response");
}

async function fetchClusters(regionName : string) {
    const client = new ECSClient({
        region: regionName
    });
    const command = new ListClustersCommand({});
    const response = await client.send(command);
    return response.clusterArns;
}

async function fetchServices(clusterArn: string, regionName: string) {
    const client = new ECSClient({
        region: regionName
    });
    const command = new ListServicesCommand({
        cluster: clusterArn
    });
    const response = await client.send(command);
    return response.serviceArns;
}

