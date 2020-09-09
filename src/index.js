import express from 'express';
import cors from 'cors';
import {ApolloServer} from 'apollo-server-express';
import schema from './schema/index.js';
import resolvers from './resolvers/index.js';
import { GenresDataSource } from './dataSources/GenresDataSource.js';
import { TvShowsDataSource } from './dataSources/TvShowsDataSource.js';


const app = express();
app.use(cors());
 
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => ({appKey : req.params.appKey}),
  dataSources : ()=>({
    GenresDataSource : new GenresDataSource(),
    TvShowsDataSource : new TvShowsDataSource()
  }),
});

const PORT = process.env.PORT || 5000;

server.applyMiddleware({ app, path: '/graphql/:appKey' });
 
app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql/{your_TMDB-appKey}`);
});