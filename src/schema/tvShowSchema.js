import { gql } from 'apollo-server-express';

export default  gql `
    extend type Query {
        tvShows: [TvShow!]
        tvShow(id: ID!): TvShow!
    }
    type TvShow{
        id : ID!
        name : String!
    }`;