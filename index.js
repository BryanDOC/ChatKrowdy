const express = require("express");
const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const schema = require("./graphql/schemaIndex"); 


async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);


  const server = new ApolloServer({
    schema,     
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });


  const subscriptionServer = SubscriptionServer.create(
    {
      schema,    
      execute,
      subscribe,
      onConnect: () => console.log("Cliente WS conectado"),
      onDisconnect: () => console.log("Cliente WS desconectado"),
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );


  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 HTTP Server corriendo en http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions corriendo en ws://localhost:${PORT}${server.graphqlPath}`);
  });


  ['SIGINT', 'SIGTERM'].forEach(signal =>
    process.on(signal, () => subscriptionServer.close())
  );
}

startServer();
