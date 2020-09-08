import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import {TMDBDataSource} from 'dataSources/TMDBSource.js'
 
const app = express();
app.use(cors());
 
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources : {TMDBDataSource},
  context: async ({ req }) => ({appKey : req.params.appKey})
});

const PORT = process.env.PORT || 5000;

server.applyMiddleware({ app, path: '/graphql/:appKey' });
 
app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql/{your_TMDB-appKey}`);
});