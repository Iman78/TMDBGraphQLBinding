import { gql } from 'apollo-server-express';

export default  gql `
    input SimilarityInput {
        firstItemId: ID!
        secondItemId: ID!
        similarityRate: Float
        similarityFactors: [SimilarityFactorInput]
    }
    input SimilarityFactorInput{
        factorName: String
        similarityRate: Float
    }
    type SimilarityRecord {
        _id:ID!
        firstItemId: ID!
        secondItemId: ID!
        similarityRate: Float
        similarityFactors: [SimilarityFactor]
        createdAt: String
    }
    type SimilarityFactor{
        factorName: String
        similarityRate: Float
    }
    type Similarity{
        similarityRate: Float!
        similarityFactors: [SimilarityFactor]
        item: Item
    }
    union Item= TvShow | Movie


    `;

    //TMDB has some genre ids that are not stored in the genre table;
    //hence the workaround of having a null value accepted as a genre name