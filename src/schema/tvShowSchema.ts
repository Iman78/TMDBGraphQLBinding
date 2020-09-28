import {gql} from 'apollo-server-express';

export default  gql `
    extend type Query {
        searchTvShows(query: String!, page: Int): TvShowsPaginated!
        tvShow(id: ID!): TvShow!
    }
    type TvShowsPaginated{
        page: Int!
        total_results: Int!
        total_pages: Int!
        results: [TvShow!]
    }
    type Season {
        id: ID!
        air_date: String
        episode_count: Int
        name: String
        overview: String
        poster_path: String
        season_number: Int!
        episodes: [Episode!]
    }
    type Episode{
        id: ID!
        air_date: String
        episode_number: Int!
        name: String!
        season_number: Int!
        still_path: String
        vote_average: Float
        vote_count: Float
    }
    type Network{
        name: String!,
        id: Int!,
        logo_path: String,
        origin_country: String
    }
    type TvShow{
        id: ID!
        name: String!
        genres: [Genre]
        overview: String

        episode_run_time: [Float]
        number_of_episodes: Float
        number_of_seasons: Float
        status: String
        type: String

        vote_average: Float
        vote_count: Float
        first_air_date: String

        homepage: String
        in_production: Boolean
        languages: [String!]

        origin_country: [String!]
        original_language: String
        popularity: Float
        poster_path: String

        last_air_date: String
        last_episode_to_air: Episode
        next_episode_to_air: Episode

        backdrop_path: String
        
        seasons: [Season]
        networks: [Network!]    
    }
`;