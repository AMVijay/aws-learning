export const handler = async () => {
    console.log("Hello, World");

    const payload = {
        "query": `{
            getConfig(configName: "TEST"){
                items{
                    configName
                    value
                }
            }
        }`
    }

    console.log("Payload", JSON.stringify(payload));
    const HOSTNAME = process.env.HOSTNAME;
    console.log("URL", process.env.APPSYNC_URI);
    console.log("HOSTNAME", HOSTNAME);
    console.log("X_API_KEY", process.env.X_API_KEY);

    await fetch(process.env.APPSYNC_URI as string,{
        method: "POST",
        headers: {
            'Content-Type': 'application/graphql',
            Host: HOSTNAME as string,
            'host': HOSTNAME as string,
            'x-appsync-domain': HOSTNAME as string,
            "x-api-key": process.env.X_API_KEY as string
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
         console.log('Here is the data: ', data);
    });
    // var result = (await response.json());
    // console.log("result", result);
    // if(result.ok){
    //     console.log("result data", result.data);
    // }
    

    // const apolloClient = new ApolloClient({
    //     uri: process.env.APPSYNC_URI,
    //     cache: new InMemoryCache(),
    //     headers: {
    //         Host: process.env.HOSTNAME as string,
    //         "x-api-key": process.env.X_API_KEY as string
    //     }
    // });



    // apolloClient.query({
    //     query: gql`
    //         query getConfig(configName: "TEST") {
    //             items {
    //                 configName,
    //                 value
    //             }
    //         }
    //     `
    // }).then((result) => console.log(result));

    console.log("handler completed");
}