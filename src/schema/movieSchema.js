import {gql} from 'apollo-server-express';

export default  gql `
    extend type Query {
        searchMovies(query : String!): MoviesPaginated!
        movie(id: ID!): Movie!
    }
    type MoviesPaginated{
        page: Int!,
        total_results: Int!,
        total_pages: Int!,
        results : [TvShow!]
    }
    type Movie{
        id : ID!
        name : String!
    }`;