import { gql } from 'apollo-server-express';
import genreSchema from './genreSchema.js';
import tvShowSchema from './tvShowSchema.js';
import movieSchema from './movieSchema.js';

const linkSchema = gql`
    type Query {
        _: Boolean
    }
`;
export default [linkSchema, genreSchema, tvShowSchema, movieSchema];