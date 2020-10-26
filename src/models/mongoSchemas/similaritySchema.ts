import { Document, Model, model, Types, Schema, Query } from "mongoose"
import { SimilarityDbDto } from "../types/similarity";
import { SimilarityFactorSchema } from "./similarityFactorSchema";

const SimilaritySchema = new Schema({
    firstItemId : {
        type: Number,
        required: true
    },
    secondItemId : {
        type: Number,
        required: true
    },
    similarityRate : {
        type: Number,
        required: true
    },
    similarityFactors : [SimilarityFactorSchema] 
}, { timestamps : true});

export interface ISimilaritySchema extends Document, SimilarityDbDto{
}

export const tvShowSimilaritiesModel= model<ISimilaritySchema, Model<ISimilaritySchema>>("tvshow_similarities", SimilaritySchema);
export const movieSimilaritiesModel= model<ISimilaritySchema, Model<ISimilaritySchema>>("movie_similarities", SimilaritySchema);
