import { gql } from 'apollo-server-express';
import genreSchema from './genreSchema';
import tvShowSchema from './tvShowSchema';
import movieSchema from './movieSchema';

const linkSchema = gql`
    type Query {
        _: Boolean
    }
`;
export default [linkSchema, genreSchema, tvShowSchema, movieSchema];