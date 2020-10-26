import { gql } from 'apollo-server-express';
import genreSchema from './genreSchema';
import tvShowSchema from './tvShowSchema';
import movieSchema from './movieSchema';
import SimilaritySchema from './SimilaritySchema'

const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
`;
export default [linkSchema, genreSchema, tvShowSchema, movieSchema, SimilaritySchema];