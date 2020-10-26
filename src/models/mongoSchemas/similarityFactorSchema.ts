import { Types, Schema } from "mongoose";
import { SimilarityFactor } from "../types/similarity";

export const SimilarityFactorSchema = new Schema ({
    _id : Types.ObjectId,
    factorName : String,
    similarityRate : Number
});

export interface ISimilarityFactorDocument extends Document, SimilarityFactor{
}