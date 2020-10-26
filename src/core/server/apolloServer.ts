import {ApolloServer} from 'apollo-server-express';
import schema from '../../schema/index';
import resolvers from '../../resolvers/index';
import { MoviesDataSource } from '../../dataSources/MoviesDataSource';
import { TvShowsDataSource } from '../../dataSources/TvShowsDataSource';
import app from './expressServer';
import { SimilarityDataSource } from './../../dataSources/SimilarityDataSource';
import { movieSimilaritiesModel, tvShowSimilaritiesModel } from '../../models/mongoSchemas/similaritySchema';
import { ItemTypeEnum } from '../../models/types/itemTypeEnum';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources : ()=>({
    MoviesDataSource : new MoviesDataSource(),
    TvShowsDataSource : new TvShowsDataSource(),
    TvshowsSimilarityDataSource : new SimilarityDataSource(tvShowSimilaritiesModel, ItemTypeEnum.tvShow),
    MoviesSimilarityDataSource : new SimilarityDataSource(movieSimilaritiesModel, ItemTypeEnum.movie),
  }),
});
server.applyMiddleware({ app, path: '/graphql' });