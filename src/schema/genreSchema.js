import { gql } from 'apollo-server-express';

export default  gql `
    extend type Query {
        tvGenres: [Genre!]
    }
    
    type Genre{
        id : ID!
        name : String!
    }`;