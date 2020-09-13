import {ApolloServer} from 'apollo-server-express';
import schema from '../../schema/index';
import resolvers from '../../resolvers/index';
import { MoviesDataSource } from '../../dataSources/MoviesDataSource';
import { TvShowsDataSource } from '../../dataSources/TvShowsDataSource';
import app from './expressServer';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources : ()=>({
    MoviesDataSource : new MoviesDataSource(),
    TvShowsDataSource : new TvShowsDataSource()
  }),
});
server.applyMiddleware({ app, path: '/graphql' });

