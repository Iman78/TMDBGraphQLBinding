import {gql} from 'apollo-server-express';

export default  gql `
    extend type Query {
        searchMovies(query : String! page : Int): MoviesPaginated!
        movie(id: ID!): Movie!
    }
    type MoviesPaginated{
        page: Int!
        total_results: Int!
        total_pages: Int!
        results: [Movie!]
    }
    type Movie{
        id: ID!
        title: String!
        genres: [Genre]
        overview: String
    }`;