import { gql } from 'apollo-server-express';

export default  gql `
    extend type Query {
        tvGenres: [Genre!]
    }
    
    type Genre{
        id : ID!
        name : String
    }`;

    //TMDB has some genre ids that are not stored in the genre table;
    //hence the workaround of having a null value accepted as a genre name