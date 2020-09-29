import {gql} from 'apollo-server-express';

export default  gql `
    extend type Query {
        searchMovies(query: String! page: Int): MoviesPaginated!
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
        poster_path: String
        release_date: String
        original_title: String
        original_language: String
        backdrop_path: String
        popularity: Float
        vote_count: Int
        vote_average: Float
        video: Boolean
        budget: Int
        homepage: String
        imdb_id: String
        revenue: Int
        runtime: Int
        status: String
        tagline: String
    }`;