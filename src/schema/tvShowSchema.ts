import {gql} from 'apollo-server-express';

export default  gql `
    extend type Query {
        searchTvShows(query : String!, page : Int): TvShowsPaginated!
        tvShow(id: ID!): TvShow!
    }
    type TvShowsPaginated{
        page: Int!,
        total_results: Int!,
        total_pages: Int!,
        results : [TvShow!]
    }
    type TvShow{
        id : ID!
        name : String!
        genres : [Genre]
    }`;