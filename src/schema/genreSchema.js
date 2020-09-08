import { gql } from 'apollo-server-express';

export default  gql `
    extend type Query {
        genres: [Genre!]
        genre(id: ID!): Genre!
    }
    
    type Genre{
        id : ID!
        name : String!
    }`;